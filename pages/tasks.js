import TaskList from "../components/TaskList";
import styles from "../styles/Home.module.css";
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
      
    tasks.forEach((task) => {
        task.DueDate = new Date(task.DueDate).toLocaleDateString();
    })


    return(
        <div className={styles.taskcontainer}>
            <TaskList tasks={tasks}/>
        </div>
    )
}