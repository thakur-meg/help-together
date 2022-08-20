import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Navbar from '../components/navbar'

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
  <SessionProvider session={session}>
      <div className='h-screen overflow-y-scroll bg-blue-200'> 
        <Navbar />
        <Component {...pageProps} />

      </div>
      
  </SessionProvider>
  )
}

export default MyApp
