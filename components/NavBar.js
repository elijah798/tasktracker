import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import LoginButton from '../components/login-btn'
import { useRouter } from 'next/router'
import { useState } from 'react';
import Link from 'next/link'
import {Container} from '@mui/material'
import { Menu } from '@mui/base';
import { MenuItem } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/system'
import { Paper } from '@mui/material';
import React from 'react';




export default function NavBar({projects}) {
    const router = useRouter()
    const path = router.pathname;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        };
    const handleClose = () => {
        setAnchorEl(null);
        };

        console.log({projects})
        //create a list of projects from the projects prop
        const projectList = projects.map((project) => {
            return(
                <MenuItem key={project.id}  onClick={handleClose}>{project.Project_Title}</MenuItem>
            )
        })
        



    return (

        <Container maxWidth="auto"

        style={{backgroundColor: "#1E074C",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                height: "15vh",
                padding: "0px 50px",

    }}

        >
            <div className={styles.navbarcontainer}>
                <div className={styles.projectselector}>
                    <h1 className={styles.subtitle}>Ject.io: Development</h1>
                    <div className={styles.dropdown}>
                        <Button
                        id='project-button'
                        aria-controls={open ? 'project-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={open ? handleClose : handleClick}
                        >
                        <FontAwesomeIcon className={styles.dropdownicon} icon={faCaretDown} size="2xs" style={{color: "#FFFFFF",}} />
                        </Button>


                        <Menu
                        id="project-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'project-button',
                        }}
                        
                        >
                            <Paper elevation={24} square>
                            {projectList}
                            </Paper>

                        </Menu>

                        
                    
    
                    </div>
                </div>

                <div className={styles.navlinks}>
                        <Link className={styles.navbaritemtext} href="/dashboard">Dashboard</Link>
                        <Link className={styles.navbaritemtext} href="/tasks">Tasks</Link>
                        <Link className={styles.navbaritemtext} href="/team">Team</Link>
                </div>
            </div>

            <div className={styles.loginbutton}>
                <LoginButton/>
            </div>
        </Container>


    )
}






