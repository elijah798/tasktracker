import styles from '../styles/Home.module.css'
import CreateTask from '../components/CreateTask'
import LoginButton from '../components/login-btn'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { getXataClient } from '../src/xata'
import Link from 'next/link';
import TaskList from '../components/TaskList';




const xata = getXataClient();

export async function getServerSideProps(context) {
    const tasks = await xata.db.tasks.getAll();
    return {
        props: {
            tasks: JSON.parse(JSON.stringify(tasks)),
            
            
            
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
            
           <p>Hi, You found the secret greeting!</p>


            </main>
        </div>
    )
}