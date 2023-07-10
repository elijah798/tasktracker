import {useSession, signIn, signOut} from 'next-auth/react'
import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import {Button} from 'antd';
import { Dropdown, Space } from 'antd';
import { Avatar } from 'antd';
import Image from 'next/image'
import React from 'react';


export default function Component() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    const items = [
        {
          key: '1',
          label: (
            <Button type='text'>Account</Button>
          ),
        },
        {
            key: '2',
            label: (
                <Button type='text'>Settings</Button>
                ),
        },
        {
            key: '3',
            label: (
                <Button type='text' onClick={() => signOut()}>Sign Out</Button>
                ),
        }


    ]




    const {data: session } = useSession()
    if (session) {
        return (
            <>

                

                <Dropdown
                 menu={{
                    items,
                  }}
                >
                <Button
                   type='text'>
                    <Space size='large'>
                        <FontAwesomeIcon color='white' icon={faCaretDown} />
                        <Avatar size='small' icon={<Image fill="true" src={session.user.image} alt="profile picture" />} >   </Avatar>
                    </Space>
                   
                </Button>

                </Dropdown>
                    


            </>

        )
    } else {
        return (
            <>
            <Button type='primary' onClick={() => signIn()}>Sign in</Button>
            
            </>
        )
    }

    }
// }   