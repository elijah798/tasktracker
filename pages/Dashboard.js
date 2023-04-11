import styles from '../styles/Home.module.css'
import { useState } from 'react';
import { getXataClient } from '../src/xata'

const xata = getXataClient();

export async function getServerSideProps(context) {
    const tasks = await xata.db.tasks.getAll();
    return {
        props: {
            //serialise the data to JSON
            tasks: JSON.parse(JSON.stringify(tasks))
        }
    }
}

export default function Dashboard({tasks}){

    const [active, setActive] = useState(true)

    const onClick = () => {
        setActive(!active)
    }




  
    tasks.forEach((task) => {
        task.DueDate = new Date(task.DueDate).toLocaleDateString();
    })

    


    return(
        <div className={styles.container}>
            <main className={styles.main}>
            <h1 className={styles.title}>Dashboard</h1>
            <div className={styles.taskview}>
                <div className={styles.grid}>
                    <a className={styles.subtitle} href="#">Projects</a>
                    <a className={styles.active} href="#">Tasks</a>
                    <a className={styles.subtitle} href="#">Team</a>
                </div>
                <br></br>

                <div className={styles.taskviewheader}>
                
                </div>
                
                <div className={styles.grid}>


                    {
                        tasks.map((task) => {
                            return (
                                <div className={styles.card} key={task.id}>
                                    <h2>{task.Description}</h2>
                                    <p>Due Date: {task.DueDate}</p>
                                    <p>Severity: {task.Severity}</p>
                                    <p>Status: {task.Status}</p>
                                </div>
                            )
                        }
                        )

                    }
                </div>
            </div>


            </main>

        </div>
    )
}