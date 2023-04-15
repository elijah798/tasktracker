import '../styles/globals.css'
import {SessionProvider} from "next-auth/react"
import { useEffect } from 'react'


export default function App({
    Component,
    pageProps: { session, ...pageProps }
}) {

  [session, setSession] = useState(null)


    return (
      //check if session is null and if it is, return null
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
        
    )
}
