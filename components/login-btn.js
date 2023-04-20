import {useSession, signIn, signOut} from 'next-auth/react'
import styles from '../styles/Home.module.css'

export default function Component() {
    const {data: session } = useSession()
    if (session) {
        return (
            <>
            <button className={styles.LoginButton} onClick={() => signOut()}>Sign out</button> <br/>

            Signed in as {session.user.email}
            </>

        )
    }
    return (
        <>
        <button className={styles.LoginButton} onClick={() => signIn()}>Sign in</button><br/>
        Not signed in 
        </>
    )

}