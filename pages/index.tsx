import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Postbox from '../components/postbox'

const Home: NextPage = () => {
  return (
    <div className='max-w-5xl my-7 mx-auto'>
      <Head>
        <title>Help Together</title>
      </Head>
      <Postbox />
      <div>

      </div>
    </div>
  )
}

export default Home
