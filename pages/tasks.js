import TaskList from "../components/TaskList";
import styles from "../styles/Home.module.css";
import { useSession } from "next-auth/react";
import { getXataClient } from "../src/xata";

const xata = getXataClient();

export async function getServerSideProps(context) {
    const tasks = await xata.db.tasks.getAll();

    return {
        props: {
            tasks: JSON.parse(JSON.stringify(tasks)),
            
             
        }
    }
}

export default function tasks({tasks}){
      

    const {data: session } = useSession()
    tasks.forEach((task) => {
        task.DueDate = new Date(task.DueDate).toLocaleDateString();
    })

    if (session) {
        return (
            <>
                <div className={styles.taskcontainer}>
                    <TaskList tasks={tasks}/>
                </div>
            </>
        )
    }else {
        return(
            <>
                <h1>You must be signed in to view this page</h1>
            </>
        )
    }



}