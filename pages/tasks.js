/* eslint-disable react-hooks/rules-of-hooks */
import TaskList from "../components/TaskList";
import styles from "../styles/Home.module.css";
import NavBar from "../components/NavBar";
import { Affix, Select } from "antd";
import { Button, Space, Table, Modal, Input, DatePicker, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {useSession, signIn, signOut} from 'next-auth/react'
import { getXataClient } from "../src/xata";
import { FloatButton } from 'antd';
import { handleClientScriptLoad } from "next/script";
import { useRouter } from "next/router";
import { useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import task from "./task/[tid]";
import { useEffect } from "react";




const { TextArea } = Input;

const xata = getXataClient();

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req,context.res, authOptions);


    if(!session){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
   

    const tasks = await xata.db.tasks.filter({Owner: session.user.email}).getAll();
    const projects = await xata.db.projects.getAll();
    const user = await xata.db.nextauth_users.getFirst({email: context.req.cookies.email});

    return {
        props: {
            tasks: JSON.parse(JSON.stringify(tasks)),
            projects: JSON.parse(JSON.stringify(projects)),
            user: JSON.parse(JSON.stringify(user)),
            
             
        }
    }
}

export default function tasks({tasks, projects, user}){



    const Router = useRouter();

    const [Role, setRole] = useState(user.Role);
    const [pointer, setPointer] = useState(Role == "admin" ? "pointer" : "auto");
    const [modal, setModal] = useState(false);

    const showModal = () => {
        setModal(true);
    };


        const [title, setTitle] = useState("");
        const [description, setDescription] = useState("");
        const [dueDate, setDueDate] = useState("");
        const [priority, setPriority] = useState("Low");
        const [status, setStatus] = useState("Open");
        const [project, setProject] = useState("rec_cgn07s92s80sdvggntag");
        const [Owner, setOwner] = useState(user.email);
    

    const refreshData = () => {
        Router.replace(Router.asPath);
    }

    const handleOk = () => {
        setModal(false);

        //get data from modal and create task
        const task = {
            Title: title,
            Description: description,
            DueDate: dueDate,
            Priority: priority,
            Status: status,
            Project: "rec_cgn07s92s80sdvggntag",
            Date_Created: new Date(),
            Last_Updated: new Date(),
            Owner: Owner
        }

        if(user.Role == "admin"){
        fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        })
        .then(refreshData())
    }else{
        alert("You must be an admin to create a task")
    }
    };

    const handleCancel = () => {
        setModal(false);
    };

    const opentask = (id) => {
        if(user.Role == "admin"){
            Router.push(`/task/${id}`);
        }
    }


    const {data: session } = useSession()



    tasks.forEach((task) => {
        task.DueDate = new Date(task.DueDate).toLocaleDateString();
    })

    const taskcolumns = [

        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',

        },
        {
            title: 'Task Description',
            dataIndex: 'Description',
            key: 'Description',

        },

        {
            title: 'Due Date',
            dataIndex: 'DueDate',
            key: 'DueDate',
            responsive: ['sm'],

        },
        {
            title: 'Priority',
            dataIndex: 'Priority',
            key: 'Priority',
            responsive: ['md'],

        },
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
            responsive: ['lg'],

        },
    ]



    if (session) {
        return (
            <>

                <Affix offsetTop={0}>
                <NavBar projects={projects}/>
                </Affix>

                <Table style={
                    {
                        cursor: pointer,
                    }
                } onRow={(record, rowIndex) => {
    return {
      onClick: (event) => {opentask(record.id)}, // click row
    };
  }} dataSource={tasks} columns={taskcolumns} />
                <FloatButton type="primary" open={() => {}} onClick={showModal} shape="circle" size="large" icon={<PlusOutlined />}/>
                <Modal className="mx-auto" title="Create Task" open={modal} onOk={handleOk} onCancel={handleCancel}>
                    <Form
                        type="flex"
                        direction="vertical"
                        align="middle"
                        size="small"
                        justify="center"   
                    >
                    
                        <Form.Item
                            label="Task Title"
                        >
                            <Input placeholder="Task Title" onChange={(event) => {setTitle(event.target.value)}}></Input>
                        </Form.Item>

                        <Form.Item
                            label="Task Description"
                        >
                            <TextArea rows={6} placeholder="Task Description" onChange={(event) => {setDescription(event.target.value)}}></TextArea>
                        </Form.Item>

                        <Form.Item
                            label="Due Date"
                        >
                            <DatePicker size={"large"} onChange={(event) => {setDueDate(event)}}></DatePicker>
                        </Form.Item>

                        <Form.Item
                            label="Status"
                        >
                            {/* <label>Status</label> */}
                            <Select defaultValue="Open" onChange={(event) => {setStatus(event)}} >
                                <Select.Option value="Open">Open</Select.Option>
                                <Select.Option value="In Progress">In Progress</Select.Option>
                                <Select.Option value="Completed">Completed</Select.Option>
                                <Select.Option value="Closed">Closed</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Priority"
                        >
                            <Select defaultValue="Low" onChange={(event) => {setPriority(event)}} >
                                <Select.Option value="Low">Low</Select.Option>
                                <Select.Option value="Medium">Medium</Select.Option>
                                <Select.Option value="High">High</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Owner"
                        >
                            <Input disabled value={session.user.email}></Input>
                        </Form.Item>
                    </Form>
                </Modal>


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