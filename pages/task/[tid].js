/* eslint-disable react-hooks/rules-of-hooks */
import {useRouter} from 'next/router';
import { useState } from 'react';
import styles from '../../styles/Home.module.css'
import { getXataClient } from '../../src/xata'
import Link from 'next/link';
import { Space, Select } from 'antd';
import NavBar from '../../components/NavBar';
import {redirect} from 'next/navigation'

import { Input, Button } from 'antd';
import { Col, Row, Divider } from 'antd';

const { TextArea } = Input;

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
        router.push('/tasks/')
    }

    const handleCancel = () => {
        router.push('/tasks/')
    }

    const handleStatusChange = (value) => {
        console.log("Status Changed to " + value.value)
        task.Status = value.value;
    }

    const handlepriorityChange = (value) => {
        console.log("Priority Changed to " + value.value)
        task.Priority = value.value;
        console.log(task.priority)
    }



    const handleSave = () => {
 
        console.log("saving")

        // setActive(!active)
        // setButton("Edit")
        task.Description = document.getElementById('description').value;
        console.log("changing priority to: " + task.Priority);
        task.Last_Updated = new Date();

        console.log(task)
    
            fetch(`http://localhost:3000/api/tasks`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task)
            }).then(router.push('/tasks/'))
            

    }

    const date = new Date(task.DueDate).toLocaleDateString();
    

     
    return(
        <>
        
        <NavBar />
        {session ?  
        <>
        <Space key={task.id} style={
            {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',

            padding: '10px',
            margin: '20px 60px',
            borderRadius: '5px',
            boxShadow: '3px 3px 3px 3px grey',
            backgroundColor: 'white',
            color: 'black',
            fontSize: '20px',
            fontWeight: 'bold',
            fontFamily: 'Arial'
            }

        }>
            <Row>
                <Col span={24}>
                    <h1>Title: {task.Title}</h1>
                </Col>
            </Row>
            <Row>
            <Col span={24}>
                    <h2>Status:  
                         <span>
                        <Select labelInValue
                        onChange={handleStatusChange}
                        options={
                            [
                                {label: 'Open', value: 'Open'},
                                {label: 'In Progress', value: 'In Progress'},
                                {label: 'Completed', value: 'Completed'},
                                {label: 'Closed', value: 'Closed'}
                            ]
                        }
                        defaultValue={task.Status}
                        >

                        </Select>
                        </span></h2>
                </Col>
                <Col span={12}>
                    <h2>Due Date: {date}</h2>
                </Col>
                <Col span={12}>
                    <h2>Priority: <span>
                        <Select labelInValue  
                        onChange={handlepriorityChange}
                        options={
                            [
                                {label: 'Low', value: 'Low'},
                                {label: 'Medium', value: 'Medium'},
                                {label: 'High', value: 'High'},
                                {label: 'Urgent', value: 'Urgent'}
                            ]
                        }
                        defaultValue={task.Priority}
                        >
                        </Select>
                        </span></h2>
                </Col>
            </Row>
            <Row style={
                {
                    width: '60vw',
                    resize: 'none',
                    fontSize: '15px',
                    fontWeight: 'normal',
                    fontFamily: 'Arial',
                    color: 'black',
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '10px',
                    margin: '10px 0px'
                }

            }>
                <Col span={24}>
                    <h2>Description: </h2>
                    <TextArea id='description' style={
                        {
                            width: '100%',
                            resize: 'none',
                            fontSize: '15px',
                            fontWeight: 'normal',
                            fontFamily: 'Arial',
                            color: 'black',
                            backgroundColor: 'white',
                            borderRadius: '5px',
                            padding: '10px',
                            margin: '10px 0px'
                        }

                    } rows={6} defaultValue={task.Description} />
                </Col>
            </Row>

            <Row>
                <Space style={
                    {
                        justifyContent: 'space-between',
                    }
                }>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </Space>
            </Row>

        </Space>
        </>
        : <h1>Not Signed in</h1>}
        </>
        

    )
}

