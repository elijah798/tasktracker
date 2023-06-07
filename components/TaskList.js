import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useSession } from 'next-auth/react'
import LoginBtn from '../components/login-btn'
import CreateTask from './CreateTask'
import { Card } from '@mui/material'
import { CardActions } from '@mui/material'
import { CardContent } from '@mui/material'
import { Button } from '@mui/material'
import { Typography } from '@mui/material'
import { Grid } from '@mui/material'
import { Item } from '@mui/material'


function TaskList({tasks}){

    const {data: session, status} = useSession();

    if (status === 'loading') {
        return <div>Loading...</div>
    }

    if (!session) {
        return (
            <div>
                <h1>You must be signed in to view this page</h1>
            </div>
            
        )
    }

   
    return (
        <>
       <Grid>
            <Grid container spacing={2}>
                {tasks.map((task) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={task.id}>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Id: {task.id}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                    {task.Title}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Description: {task.Description}

                                    </Typography>
                                    <Typography variant="body2">
                                    Due Date: {task.DueDate}
                                    <br />
                                    Priority: {task.Priority}
                                    <br />
                                    Status: {task.Status}

                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link href={`/task/${task.id}`}><Button size="large">Open Task</Button></Link>
                                </CardActions>
                            </Card>

                            </Grid>
                    )
                })}
                </Grid>
                </Grid>
                </>
                )
            }


export default TaskList


{/* {
              
                tasks.map((task) => {
                    return (
                        <Card key={task.id} sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {task.DueDate}
                                </Typography>
                                <Typography variant="h5" component="div">
                                {task.Name}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {task.Description}
                                </Typography>
                                <Typography variant="body2">
                                {task.name}
                                <br />
                                {'"a benevolent smile"'}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    )
                })
            } */}