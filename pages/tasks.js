/* eslint-disable react-hooks/rules-of-hooks */
import TaskList from "../components/TaskList";
import styles from "../styles/Home.module.css";
import NavBar from "../components/NavBar";
import { Affix } from "antd";
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Table } from "antd";
import {useSession, signIn, signOut} from 'next-auth/react'
import { getXataClient } from "../src/xata";
import { FloatButton } from 'antd';

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

    const taskcolumns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Task Name',
            dataIndex: 'Description',
            key: 'Description',
            render: (text, record) => <a href={`/task/${record.id}`}>{text}</a>,
        },

        {
            title: 'Due Date',
            dataIndex: 'DueDate',
            key: 'DueDate',
        },
        {
            title: 'Priority',
            dataIndex: 'Priority',
            key: 'Priority',
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: () => {
                return (
                    <div>
                        <Space size='small'>
                        <Button type='primary' ghost onClick={console.log('Edit')}>Edit</Button>
                        <Button danger onClick={console.log('Delete')}>Delete</Button>
                        </Space>
                    </div>
                )
            }
        },
    ]



    if (session) {
        return (
            <>
                <Affix offsetTop={0}>
                <NavBar projects={projects}/>
                </Affix>

                <Table dataSource={tasks} columns={taskcolumns} />
                <FloatButton type="primary" shape="circle" size="large" icon={<PlusOutlined />}/>


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