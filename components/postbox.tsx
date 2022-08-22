import { CameraIcon, LinkIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import Avatar from './avatar'
import { useForm } from 'react-hook-form'
import { ExclamationCircleIcon } from '@heroicons/react/outline'
import { useMutation, gql } from '@apollo/client'
import { ADD_POST, ADD_TAG } from '../graphql/mutation'
import client from '../apollo-client'
import { GET_ALL_POSTS, GET_TAG_BY_TOPIC } from '../graphql/queries'
import { format } from 'path'
import toast from 'react-hot-toast'

type FormData = {
    postTitle: string
    postBody: string
    postImage: string
    tag: string
}
type Props = {
    tags?: string
}

function postbox({tags}: Props) {
    const { data: session} = useSession()
    const [addPost] = useMutation(ADD_POST, {
        refetchQueries: [
            GET_ALL_POSTS,
            'getPostList'
        ],
    })
    const [addTag] = useMutation(ADD_TAG)

    const [imageBoxOpen, setImageBoxOpen] = useState(false)
    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: {errors},
     } = useForm<FormData>()
    
    const onSumbit = handleSubmit(async(formData) => {
        console.log(formData)
        const notification = toast.loading('Creating post...')
        try{
            console.log('checking tag')
            const { data: { getTagsListByTopic } } = await client.query({
                query: GET_TAG_BY_TOPIC,
                variables: {
                    topic:  tags || formData.tag
                }
            })
            const tagExists = getTagsListByTopic.length > 0;

            console.log('checked')
            if(!tagExists) {
                console.log("New tag")
                const { data: { insertTag: newTag } } = await addTag({
                    variables: {
                        topic: formData.tag,
                    }
                })
                console.log("post making", formData)
                const image = formData.postImage || ''

                const { data: { insertPost: newPost } } = await addPost({
                    variables: {
                        body: formData.postBody,
                        image: image,
                        tags_id: newTag.id,
                        title: formData.postTitle,
                        username: session?.user?.name
                    }
                })
                console.log("Post made")

            } else {
                const image = formData.postImage || ''

                const { data: { insertPost: newPost } } = await addPost({
                    variables: {
                        body: formData.postBody,
                        image: image,
                        tags_id: getTagsListByTopic[0].id,
                        title: formData.postTitle,
                        username: session?.user?.name
                    }
                })
                console.log("Post made")
            }
            setValue('postBody', '')
            setValue('postTitle', '')
            setValue('postImage', '')
            setValue('tag', '')

            toast.success('New post made!', {
                id: notification
            })
        } catch(error){
            toast.error('Whoops something went wrong!', {
                id: notification
            })
            console.log(error)
        }
    })
  return (

    <form onSubmit={onSumbit} className='sticky top-16 z-50 bg-white border border-gray-300 p-2 rounded-md'>
        <div className='flex items-center space-x-3'>
            <Avatar />

            <input 
            {...register('postTitle', {required: true})}
            type='text' disabled={!session} className='flex-1 bg-green-50 p-2 outline-none rounded-md' placeholder={session ? tags ? `Create a post in #${tags}` : 'Start a conversation!' : 'Sign in to make a post'} />

            <CameraIcon 
            onClick={() => setImageBoxOpen(!imageBoxOpen)} 
            className={`h-6 cursor-pointer ${imageBoxOpen===true ? 'text-green-400' : 'text-gray-200'} `}/>
            <LinkIcon className={`h-6 text-gray-200 `}/>
        </div>
        {!!watch('postTitle') && (
            <div className='flex flex-col py-2'>
                {!tags && (
                    <div className='flex items-center px-2'>
                    <input 
                    {...register('tag', {required: true})}
                    type='text' placeholder='Tag'
                    className= 'flex-1 bg-green-50 outline-none p-2 m-2' />
                </div>
                )}
                
                <div className='flex items-center px-2'>
                    <input 
                    {...register('postBody')}
                    type='text' placeholder='Tell us more! (Optional)'
                    className= 'flex-1 bg-green-50 outline-none p-6 m-2' />
                </div>
                {imageBoxOpen && (
                    <div className='flex items-center px-2'>
                    <input 
                    {...register('postImage')}
                    type='text' placeholder='Image URL'
                    className= 'flex-1 bg-green-50 outline-none p-2 m-2' />
                </div>
                )}

                {Object.keys(errors).length > 0 && (
                    <div className='space-y-2 p-2 text-red-500'>
                        {errors.postTitle?.type === 'required' && (
                            <div className='flex'><ExclamationCircleIcon  className='h-6 w-6'/><p>Post Title is required.</p></div>
                        )}
                        {errors.tag?.type === 'required' && (
                            <div className='flex'><ExclamationCircleIcon className='h-6 w-6'/><p>Tag is required.</p></div>
                        )}
                    </div>
                )}

                {watch('postTitle') && 
                <button 
                type='submit'
                className='w-full rounded-full bg-green-400 p-2 text-white'>Post</button>}
            </div>
        )}
    </form>
  )
}

export default postbox