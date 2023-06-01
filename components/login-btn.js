import {useSession, signIn, signOut} from 'next-auth/react'
import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { Menu } from '@mui/base';
import { MenuItem } from '@mui/material';
import { Button } from '@mui/material';
import { Avatar } from '@mui/material';
import { Paper } from '@mui/material';
import { Divider } from '@mui/material';
import React from 'react';


export default function Component() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        };
    const handleClose = () => {
        setAnchorEl(null);
        };


    const {data: session } = useSession()
    if (session) {
        return (
            <>

                <Button
                    id="acc-button"
                    aria-controls={open ? 'acc-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={open ? handleClose : handleClick}
                    >
                <div className={styles.imgcontainer}>
                    <Avatar sx={{width: 32, height: 32}}>  <Image fill="true" src={session.user.image} alt="profile picture" /> </Avatar>
                </div>
                </Button>

                <Menu
                    id="acc-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'acc-button',
                    }}
                    >
                        <Paper elevation={24}>
                        <MenuItem onClick={handleClose}>Account</MenuItem>
                        <MenuItem onClick={handleClose}>Settings</MenuItem>
                        <Divider/>
                        <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
                        </Paper>

                </Menu>

            </>

        )
    } else {
        return (
            <>
            <Button onClick={() => signIn()}>Sign in</Button>
            
            </>
        )
    }

    }
// }   