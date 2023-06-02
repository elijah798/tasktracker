/* eslint-disable react-hooks/rules-of-hooks */
import TaskList from "../components/TaskList";
import styles from "../styles/Home.module.css";
import NavBar from "../components/NavBar";
import {useSession, signIn, signOut} from 'next-auth/react'
import { getXataClient } from "../src/xata";

const xata = getXataClient();

export async function getServerSideProps(context) {
    const tasks = await xata.db.tasks.getAll();
    const projects = await xata.db.projects.getAll();

    return {
        props: {
            tasks: JSON.parse(JSON.stringify(tasks)),
            projects: JSON.parse(JSON.stringify(projects)),
            
             
        }
    }
}

export default function tasks({tasks, projects}){
      

    const {data: session } = useSession()

    tasks.forEach((task) => {
        task.DueDate = new Date(task.DueDate).toLocaleDateString();
    })

    if (session) {
        return (
            <>
                <NavBar projects={projects}/>
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