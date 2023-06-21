import '../styles/globals.css'
import { Layout } from 'antd';
import { ConfigProvider } from 'antd';
import {SessionProvider} from "next-auth/react"
import { useState } from 'react';


import NavBar from '../components/NavBar';





export default function App({
    Component,
    pageProps: { session,  ...pageProps},
    


}) 

{

    return (
      <SessionProvider session={session}>
        <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#1E074C',
      },
    }}
  >

    {<Component {...pageProps} />}
  </ConfigProvider>

      </SessionProvider>
        
    )
}
