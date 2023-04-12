import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import { getXataClient } from '../../src/xata'
const xata = getXataClient();

export async function getServerSideProps(context) {
    const { tid } = context.params;
    const task = await xata.db.tasks.getFirst(tid);





    return {
        props: {
            task: JSON.parse(JSON.stringify(task))
        }
    }
}



export default function task({task}){

    return(
        <div className={styles.container}>
            <main className={styles.main}>
            <h1>Task ID: {task.id}, {task.Description}</h1>
            
            </main>

        </div>

    )
}

