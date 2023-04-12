/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router'
import { useState } from 'react';
import styles from '../../styles/Home.module.css'
import { getXataClient } from '../../src/xata'
import Link from 'next/link';
import Button from 'react-bootstrap/Button'

const xata = getXataClient();





export const getServerSideProps = async (context) => {
    const tid = context.params.tid;


    const task = await xata.db.tasks.read(tid);



    return {
        props: {
            task: JSON.parse(JSON.stringify(task)),
            
        }
    }
}




export default function task({task}){

    const [active, setActive] = useState(true);



    const handleEdit = () => {
        setActive(!active)
    }

    const handleSave = () => {
        setActive(!active)

        task.Status = document.getElementById("statusSelect").value;
        task.Priority = document.getElementById("prioritySelect").value;
        console.log("HELLLOOO")
    
            fetch(`http://localhost:3000/api/tasks`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            })



}





    const date = new Date(task.DueDate).toLocaleDateString();
 
    return(
        <div className={styles.container} key={task.id}>
                <Link href='/Dashboard/'><h1 className={ styles.bluetext}>Dashboard</h1></Link>
            <h1 className={styles.title}>Task ID: {task.id}</h1>
            
                <h1>Description: {task.Description}</h1>
                <h1>Task Owner: {task.Owner}</h1>
                <h1>Due Date: {date}</h1>
                <div className={styles.selectGroup}>
                    <h1>Status:</h1>
                    <select id="statusSelect" disabled={active}>
                        <option value={`${task.Status}`}>{task.Status}</option>
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className={styles.selectGroup}>
                    <h1>Priority:</h1>
                    <select id="prioritySelect" disabled={active} defaultValue={task.Priority}>
                        <option value={`${task.Priority}`}>{task.Priority}</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

                <div className={styles.links}>

                <Button className={styles.LoginButton} onClick={handleEdit} >Edit</Button>
                <Button className={styles.LoginButton} onClick={handleSave} >Save</Button>
                <Button className={styles.LoginButton} >Delete</Button>


                </div>
        </div>


    )
}

