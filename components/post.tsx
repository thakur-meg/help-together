import React from 'react'
import {
    ArrowDownIcon,
    ArrowUpIcon,
    BookmarkAltIcon,
    BookmarkIcon,
    ChatAltIcon,
    ShareIcon,
} from '@heroicons/react/outline'
import TimeAgo from 'react-timeago'
import Image from 'next/image'
import Link from 'next/link'
import { NewtonsCradle } from '@uiball/loaders'


type Props = {
    post: Post
}

function post({ post }: Props) {
    if(!post) return (
        <div className='flex w-full items-center justify-center p-10 text-lg'>
            <NewtonsCradle  size={50} color="purple"/>
        </div>
    )

  return (
        <Link href={`/post/${post.id}`} >
        <div className='flex cursor-pointer rounded-md border border-purple-300 bg-white shadow-sm hover:border-purple-600'>
        <div className='flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400'>
            <ArrowUpIcon className='voteButtons hover:text-green-700'/>
            <p className='font-bold text-xs'>0</p>
            <ArrowDownIcon className='voteButtons hover:text-red-700'/>
        </div>
        <div className='p-3 pb-1 '>
            <div className='text-sm text-gray-300 '>
                <Image 
                height='40px'
                width='40px'
                src={`https://robohash.org/seeds${post.username}/?set=set4`}
                className='rounded-full overflow-hidden border border-gray-300 bg-white'/>
                <span >Posted by {post.username}</span> <TimeAgo date={post.created_at} />
            </div>
            <h2 className='text-xl font-semibold'>{post.title}</h2>
            <h4>{post?.body}</h4>
            <img src={post.image} alt="" className='w-full m-2'/>
            <h2 className='bg-purple-500 rounded-full text-center border border-purple-500 shadow-sm text-white hover:bg-purple-400 w-20 my-4' >#{post.tags[0].topic}</h2>
            

            <div className='flex space-x-4 text-gray-400' >
                <div className='postButtons'>
                    <ChatAltIcon className='h-6 w-6' />
                    <p className='hidden sm:inline'>{post.comments.length} Comments</p>
                </div>
                <div className='postButtons'>
                    <ShareIcon className='h-6 w-6' />
                    <p className='hidden sm:inline'>Share</p>
                </div>
                <div className='postButtons'>
                    <BookmarkIcon className='h-6 w-6' />
                    <p className='hidden sm:inline'>Save</p>
                </div>

            </div>

        </div>
    
    </div>
    </Link>
  )
}

export default post