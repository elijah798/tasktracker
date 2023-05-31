import styles from "../styles/Home.module.css";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useState } from "react";

function CreateTask() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
            <Button className={styles.LoginButton} onClick={handleShow}>Create Task</Button>

            <Modal open={show} onClose={handleClose}>
                <Box sx={{
        width: 300,
        height: 300,
        backgroundColor: 'primary.dark',
      }}>
                
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
                    </Box>
            </Modal>
        </>
    );


}

export default CreateTask;





