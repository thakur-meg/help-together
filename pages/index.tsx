import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/navbar'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Help Together</title>
      </Head>
      <Navbar />
      <h1>Hello</h1>
    </div>
  )
}

export default Home
