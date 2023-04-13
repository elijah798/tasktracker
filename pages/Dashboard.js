import styles from '../styles/Home.module.css'
import CreateTask from '../components/CreateTask'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { getXataClient } from '../src/xata'
import Link from 'next/link';

const xata = getXataClient();

export async function getServerSideProps(context) {
    const tasks = await xata.db.tasks.getAll();
    return {
        props: {
            
            tasks: JSON.parse(JSON.stringify(tasks))
        }
    }
}

export default function Dashboard({tasks}){

    const [active, setActive] = useState(true)
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                <CreateTask/>
                    


                    {
                        tasks.map((task) => {
                            return (

                                <div className={styles.card} key={task.id}>
                                    <Link key={task.id} href={`/task/${task.id}`}>
                                    <h2>{task.Description}</h2>
                                    <p>Due Date: {task.DueDate}</p>
                                    <p>Status: {task.Status}</p>
                                    <p>Priority: {task.Priority}</p>

                                    </Link>
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