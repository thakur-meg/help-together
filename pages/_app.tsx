import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Navbar from '../components/navbar'
import { ApolloProvider } from '@apollo/client'
import client from '../apollo-client'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  
  return (
  <ApolloProvider client={client}>
  <SessionProvider session={session}>
      <Toaster/>
      <div className='h-screen overflow-y-scroll bg-gray-100'> 
        <Navbar />
        <Component {...pageProps} />
        <script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></script>
        <df-messenger
          intent="WELCOME"
          chat-title="Help Together"
          chat-icon="https://i.postimg.cc/JzxH7PCK/ht-logo.png"
          agent-id="02dafac8-7eed-4074-b2f6-f4a0f223675b"
          language-code="en"
        ></df-messenger>

      </div>
      
  </SessionProvider>
  </ApolloProvider>
  )
}

export default MyApp
