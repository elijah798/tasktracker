/* eslint-disable react-hooks/rules-of-hooks */
import {useRouter} from 'next/router';
import { useState } from 'react';
import styles from '../../styles/Home.module.css'
import { getXataClient } from '../../src/xata'
import Link from 'next/link';

import {useSession} from 'next-auth/react';




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

    const {data: session, status} = useSession();

    const router = useRouter();
    const [active, setActive] = useState(true);
    const [Priority, setPriority] = useState("");
    const [button, setButton] = useState("Edit");

    const handleChange = (event) => {
        setPriority(event.target.value);
    };


    const handleEdit = () => {
        setActive(!active)
        if(active){
            setButton("Cancel")
        }else{
            setButton("Edit")
        }
    }

    const handleDelete = () => {
        console.log("Deleting")

        fetch(`http://localhost:3000/api/tasks`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        router.push('/Dashboard/')

    }


    const handleSave = () => {
        if(!active){
            console.log("saving")
            setActive(!active)
            setButton("Edit")
            task.Status = document.getElementById("statusSelect").value;
            task.Priority = document.getElementById("prioritySelect").value;
    
        
                fetch(`http://localhost:3000/api/tasks`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(task)
                })
    
        }

}

    const date = new Date(task.DueDate).toLocaleDateString();
 
    return(
        <div className={styles.container} key={task.id}>
            <h1 className={styles.title}>Task ID: {task.id}</h1>
            
                <h1>Description: {task.Description}</h1>
                <h1>Task Owner: {task.Owner}</h1>
                <h1>Due Date: {date}</h1>
                <div className={styles.selectGroup}>
                    <h1>Status:</h1>
                    <select id="statusSelect" disabled={active}  defaultValue={task.Status}>
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className={styles.selectGroup}>
                    <h1>Priority:</h1>
                    {/* <select id="prioritySelect" disabled={active} defaultValue={task.Priority}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select> */}

                                        <select
                        disabled={active}
                        defaultValue={task.Priority}
                        id="prioritySelect"
                        value={Priority}
                        label="Priority"
                        onChange={handleChange}
                    >
                        <option value={"Low"}>Low</option>
                        <option value={"Medium"}>Medium</option>
                        <option value={"High"}>High</option>
                    </select>

                </div>


                {session ? ( 
                <div className={styles.links}>
                    <button onClick={handleEdit} >{button}</button>
                    <button onClick={handleSave} >Save</button>
                    <button onClick={handleDelete} >Delete</button>
                </div>) : (
                    <p>Please Login</p>)}

        </div>


    )
}

