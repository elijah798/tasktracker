import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import LoginButton from '../components/login-btn'
import { useRouter } from 'next/router'
import { useState } from 'react';
import Link from 'next/link';
import React from 'react';
import { Button, Space, Dropdown } from 'antd'





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

   


       
    return (

        <div 

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
                </div>

                <div className={styles.navlinks}>
                        {/* <Link className={styles.navbaritemtext} href="/dashboard">Dashboard</Link> */}
                        <Link className={styles.navbaritemtext} href="/tasks">Tasks</Link>
                        {/* <Link className={styles.navbaritemtext} href="/team">Team</Link> */}
                </div>
            </div>

            <div className={styles.loginbutton}>
                <LoginButton/>
            </div>
        </div>


    )
}






