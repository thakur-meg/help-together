import React, { useEffect, useState } from 'react'
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
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { GET_VOTES_BY_POST_ID } from '../graphql/queries'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_VOTE } from '../graphql/mutation'


type Props = {
    post: Post
}

function post({ post }: Props) {
    const [vote, setVote] = useState<boolean>()
    const{data: session} = useSession()
    
    const {data, loading} = useQuery(GET_VOTES_BY_POST_ID, {
        variables: {
            post_id: post?.id
        }
    })

    const [addVote] = useMutation(ADD_VOTE, {
        refetchQueries: [
            GET_VOTES_BY_POST_ID,
            'getVotesListByPostId'
        ],
    })

    useEffect(() => {
        const votes: Votes[] = data?.getVotesByPostId
        const vote = votes?.find(votes => votes.username == session?.user?.name)?.votes

        setVote(vote)
    }, [data])
    
    if(!post) return (
        <div className='flex w-full items-center justify-center p-10 text-lg'>
            <NewtonsCradle  size={50} color="green"/>
        </div>
    )
    
    const upVote = async (isUpvote: boolean) =>{
        if(!session){
            toast('You can not vote! Sign in.')
        }
        if (vote && isUpvote) return;
        if(vote == false && !isUpvote) return;

        console.log('voting')
        await addVote({
            variables: {
                post_id: post.id,
                username: session?.user?.name,
                votes: isUpvote
            }
        })
        console.log('voted')
    }

    

  return (
        
        <div className='flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border-green-600'>
        <div className='flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400'>
            <ArrowUpIcon onClick={() => upVote(true)} className={`voteButtons hover:text-green-700 ${vote && 'text-green-700'}`}/>
            <p className='font-bold text-xs'>0</p>
            <ArrowDownIcon onClick={() => upVote(false)}className={`voteButtons hover:text-red-700 ${vote===false && 'text-red-700'}`}/>
        </div>
        <div className='p-3 pb-1 '>
            <div className='text-sm text-gray-300 '>
                <Image 
                height='40px'
                width='40px'
                src={`https://robohash.org/seeds${post.username}`}
                className='rounded-full overflow-hidden border border-gray-300 bg-white'/>
                <span >Posted by {post.username}</span> <TimeAgo date={post.created_at} />
                <div>
                <Link href={`/tags/${post.tags[0].topic}`} >
                    <h2 className='bg-green-500 rounded-full text-center border border-green-500 shadow-sm text-white hover:bg-green-400 w-20 my-4' >#{post.tags[0].topic}</h2>
                </Link>
                </div>
            </div>
            
            <Link href={`/post/${post.id}`} >
            <div>
            <h2 className='text-xl font-semibold'>{post.title}</h2>
            <h4>{post?.body}</h4>
            </div>
            </Link>
            <img src={post.image} alt="" className='w-full m-2'/>
            
            

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
  )
}

export default post