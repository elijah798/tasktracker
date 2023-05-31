import {useSession, signIn, signOut} from 'next-auth/react'
import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

export default function Component() {
    const {data: session } = useSession()
    if (session) {
        return (
            <>
            <div className={styles.accdropdown}>
                <div className={styles.imgcontainer}>
                <Image className={styles.ProfilePicture} fill="true" src={session.user.image} alt="profile picture" />
                </div>
                <div className={styles.dropdown}>
                <FontAwesomeIcon className={styles.dropdownicon} icon={faCaretDown} size="2xs" style={{color: "#FFFFFF",}} />
                    <div className={styles.dropdowncontent}>
                        <a className={styles.accitem}>Profile</a>
                        <a className={styles.accitem}>Settings</a>
                        <a className={styles.accitem} onClick={() => signOut()}>Sign Out</a>
                    </div>
                </div>
                
            </div>

            </>

        )
    }
    return (
        <>
        <button className={styles.LoginButton} onClick={() => signIn()}>Sign in</button><br/>
        
        </>
    )
    }
// }   