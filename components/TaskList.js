import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useSession } from 'next-auth/react'
import LoginBtn from '../components/login-btn'
import CreateTask from './CreateTask'

function TaskList({tasks}){

    const {data: session, status} = useSession();

    if (status === 'loading') {
        return <div>Loading...</div>
    }

    if (!session) {
        return (
            <div>
                <h1>You must be signed in to view this page</h1>
            </div>
            
        )
    }

   
    return (
        <div className={styles.grid}>
                            <CreateTask />
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
                })
            }
        </div>
    )
}

export default TaskList