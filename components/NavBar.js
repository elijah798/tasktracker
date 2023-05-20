import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import LoginButton from '../components/login-btn'
import { useRouter } from 'next/router'
import { useState } from 'react';


export default function NavBar() {
    const router = useRouter()
    const path = router.pathname;


    return (
        <div className={styles.navcontainer}>
            <div className={styles.navbarcontainer}>
            <div className={styles.projectselector}>
                <h1 className={styles.subtitle}>Ject.io: Development</h1>
                <div className={styles.dropdown}>
                <FontAwesomeIcon className={styles.dropdownicon} icon={faCaretDown} size="2xs" style={{color: "#FFFFFF",}} />

                    <div className={styles.dropdowncontent}>
                        <h1 className={styles.accitem}>SM1: Sherman Manufacturing</h1>
                        <h1 className={styles.accitem}>SM2: Sherman Manufacturing</h1>
                        <h1 className={styles.accitem}>SM3: Sherman Manufacturing</h1>
                    </div>
  
                </div>
                
                </div>

                <div className={styles.navlinks}>

                        <a className={styles.navbaritemtextactive} href="/dashboard">Dashboard</a>
                        <a className={styles.navbaritemtext} href="/tasks">Tasks</a>
                        <a className={styles.navbaritemtext} href="/team">Team</a>

                </div>
            </div>
                <div className={styles.loginbutton}>
                    <LoginButton/>
                </div>


        </div>

    )
}






