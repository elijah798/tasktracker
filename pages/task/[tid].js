/* eslint-disable react-hooks/rules-of-hooks */
import {useRouter} from 'next/router';
import { useState } from 'react';
import styles from '../../styles/Home.module.css'
import { getXataClient } from '../../src/xata'
import Link from 'next/link';
import { Space } from 'antd';
import NavBar from '../../components/NavBar';

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
        <>
        <NavBar />
        <Space key={task.id}>
            

                {session ? ( 
                <div className={styles.links}>
                    <button onClick={handleEdit} >{button}</button>
                    <button onClick={handleSave} >Save</button>
                    <button onClick={handleDelete} >Delete</button>
                </div>) : (
                    <p>Please Login</p>)}

        </Space>

        </>
        

    )
}

