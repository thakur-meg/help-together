import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Postbox from '../components/postbox'
import Feed from '../components/feed'

const Home: NextPage = () => {
  return (
    <div className='max-w-5xl my-7 mx-auto'>
      <Head>
        <title>Help Together</title>
      </Head>
      <Postbox />
      <div>
        <Feed />
      </div>
    </div>
  )
}

export default Home
