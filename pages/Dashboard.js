import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBar';
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
    const projects = await xata.db.projects.getAll();
    return {
        props: {
            projects: JSON.parse(JSON.stringify(projects)),
 
        }
    }
}

export default function dashboard({projects}){


    console.log({projects})

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onClick = () => {
        setActive(!active)
    }


    return(
        <>
            <NavBar projects={projects}/>

            <div className={styles.container}>
                <main className={styles.main}>
                    <p>Hi, You found the secret greeting!</p>
                </main>
            </div>
        </>

    )
}
