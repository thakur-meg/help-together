import { useRouter } from 'next/router'
import React from 'react'
import { GET_ALL_POSTS_BY_POST_ID } from '../../graphql/queries'
import Post from '../../components/post'
import { useMutation, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ADD_COMMENT } from '../../graphql/mutation'
import toast from 'react-hot-toast'
import Image from 'next/image'
import TimeAgo from 'react-timeago'

type FormData = {
    comment: string
}

function PostPage() {
    const router = useRouter()
    const {data: session} = useSession()
    const [addComment] = useMutation(ADD_COMMENT, {
        refetchQueries: [GET_ALL_POSTS_BY_POST_ID, 'getPostListByPostId']
    })
    const { data} = useQuery(GET_ALL_POSTS_BY_POST_ID, {
        variables: {
            post_id: router.query.postId
        }
    })
    const post: Post = data?.getPostListByPostId;

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<FormData>()

    const onSubmit: SubmitHandler<FormData> = async(data) => {
        const notification = toast.loading('Posting Comment ...')

        await addComment({
            variables: {
                post_id: router.query.postId,
                username: session?.user?.name,
                text: data.comment
            }
        })

        setValue('comment', '')

        toast.success('Comment Posted!', {
            id: notification
        })
    }
  return (
    <div>
        <Post post={post}/>

        <div className='rounded-b-md border-t-0 border border-gray-300 bg-white p-16 -mt-1'>
            <p className='text-sm'>Comment as <span className='text-purple-400'>{session?.user?.name}</span></p>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-2'>
                <textarea 
                {...register('comment')}
                disabled={!session}
                className='h-24 border border-gray-200 rounded-md p-2 pl-4 disabled:bg-gray-50' placeholder={session ? 'Share your thoughts.' : 'Sign in to comment!'}/>

                <button type='submit' className='rounded-full bg-purple-400 p-3 font-semibold text-white disabled:bg-gray-50'>Comment</button>
            </form>
        </div>
        <div className='-my-5 rounded-b-md border border-t-0 border-gray-300 bg-white py-5 px-10'>
            <hr className='py-2'/>
            {post?.comments.map(comment => (
                <div  
                className='relative flex items-center space-x-2 space-y-5 p-2'
                key={comment.id}>
                    <Image 
                    height='40px'
                    width='40px'
                    src={`https://robohash.org/seeds${comment.username}/?set=set4`}
                    className='rounded-full overflow-hidden border border-gray-300 bg-white'/>
                    <div className='flex flex-col'>
                        <p className='text-gray-300 text-sm'>
                            <span>{comment.username}</span>
                            {' '}
                            <TimeAgo date={comment.created_at}/>
                        </p>
                        <p className=''>{comment.text}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PostPage