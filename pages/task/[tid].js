/* eslint-disable react-hooks/rules-of-hooks */
import Router, { useRouter } from 'next/router'
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
    const [button, setButton] = useState("Edit");



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

        useRouter.redirect('/Dashboard');
    }


    const handleSave = () => {
        if(!active){
            console.log("saving")
            setActive(!active)
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
        console.log("After saving")




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
                    <select id="statusSelect" disabled={active}  defaultValue={task.Status}>
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className={styles.selectGroup}>
                    <h1>Priority:</h1>
                    <select id="prioritySelect" disabled={active} defaultValue={task.Priority}>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

                <div className={styles.links}>

                <Button className={styles.LoginButton} onClick={handleEdit} >{button}</Button>
                <Button className={styles.LoginButton} onClick={handleSave} >Save</Button>
                <Button className={styles.LoginButton} onClick={handleDelete} >Delete</Button>


                </div>
        </div>


    )
}

