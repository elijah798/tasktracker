import styles from "../styles/Home.module.css";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useState } from "react";

function CreateTask() {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [open, setOpen] = useState(Boolean(false));



    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const task = {
            Description: data.get("description"),
            DueDate: data.get("DueDate"),
            Status: data.get("status"),
            Priority: data.get("priority"),
            Owner: data.get("owner"),
        };
        fetch(`http://localhost:3000/api/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });


        console.log(task);
    };


    return (
        <>
            <Button onClick={handleOpen}>Create Task</Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ 
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
            
            }}
            >
            
                <Paper elevation={24}
                sx={{
                    width: 500,
                    padding: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",

                }}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create Task
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <form className={styles.formstyle} onSubmit={handleSubmit}>
                            <label>
                                Task description:
                                <input type="text" name="description" />
                            </label>
                            <label>
                                Due Date:
                                <input type="date" name="DueDate" />
                            </label>
                            <label>
                                Status:
                                <select name="status">
                                    <option value="Not Started">Not Started</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </label>
                            <label>
                                Priority:
                                <select name="priority">
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </label>
                            <label>
                                Owner:
                                <input type="text" name="owner" />
                            </label>
                            <input type="submit" value="Create Task" />
                        </form>
                    </Typography>

                </Paper>

            </Modal>

            {/* <Modal open={show} onClose={handleClose}>
                <Box sx={{
        width: 500,
        height: 500,
        padding: 2,

      }}>
        <Paper>
        <form onSubmit={handleSubmit}>
                        <label>
                            Task description:
                            <input type="text" name="description" />
                        </label>
                        <label>
                            Due Date:
                            <input type="date" name="DueDate" />
                        </label>
                        <label>
                            Status:
                            <select name="status">
                                <option value="Not Started">Not Started</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </label>
                        <label>
                            Priority:
                            <select name="priority">
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </label>
                        <label>
                            Owner:
                            <input type="text" name="owner" />
                        </label>
                        <input type="submit" value="Create Task" />
                    </form>
                    </Paper>
                    </Box>
            


        </Modal> */}
                    
        </>
    );


}

export default CreateTask;





