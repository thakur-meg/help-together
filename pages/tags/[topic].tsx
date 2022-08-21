import { useRouter } from 'next/router'
import React from 'react'
import Image from 'next/image'


function Tag() {
    const {
        query: { topic },
        } = useRouter()
  return (
    <div className={`h-24 bg-purple=400`}>
        <div>
        <Image 
                height='40px'
                width='40px'
                src={`https://robohash.org/seeds${topic}/?set=set4`}
                className='rounded-full overflow-hidden border border-gray-300 bg-white w-20 h-20'/>
                <div>
                    <h1>Posts for #{topic}</h1>
                </div>
        </div>
    </div>
  )
}

export default Tag