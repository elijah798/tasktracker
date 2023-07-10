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
import { handleClientScriptLoad } from "next/script";
import { useRouter } from "next/router";

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

    const Router = useRouter();

    const refreshData = () => {
        Router.replace(Router.asPath);
    }

    const opentask = (id) => {
        Router.push(`/task/${id}`);
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
    ]



    if (session) {
        return (
            <>
                <Affix offsetTop={0}>
                <NavBar projects={projects}/>
                </Affix>

                <Table style={
                    {
                        cursor: 'pointer',
                    }
                } onRow={(record, rowIndex) => {
    return {
      onClick: event => {opentask(record.id)}, // click row
    };
  }} dataSource={tasks} columns={taskcolumns} />
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