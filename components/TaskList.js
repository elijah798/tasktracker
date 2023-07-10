import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useSession } from 'next-auth/react'
import LoginBtn from '../components/login-btn'
import CreateTask from './CreateTask'



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