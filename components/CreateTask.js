import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "../styles/Home.module.css";
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

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );


}

export default CreateTask;





