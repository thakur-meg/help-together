import { useRouter } from 'next/router'
import React from 'react'
import Image from 'next/image'
import Postbox from '../../components/postbox'
import Feed from '../../components/feed'



function Tag() {
    const {
        query: { topic },
        } = useRouter()
  return (
    <div className={`h-24 bg-purple-400 p-8`}>
        <div className='pb-2 flex items-center'>
        <div className='ml-10'>
            <Image 
                height='40px'
                width='40px'
                src={`https://robohash.org/seeds${topic}/?set=set4`}
                className='border border-gray-300 -mt-8'/>
        </div>
            <div>
                <h1 className='text-2xl font-bold ml-10 text-white'>Posts for #{topic}</h1>
            </div>
        </div>
        <div className='mx-auto max-w-5xl pb-10'>
            <Postbox tags={topic as string}/>
            <Feed topic={topic as string}/>
        </div>
    </div>
  )
}

export default Tag