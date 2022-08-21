import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_ALL_POSTS } from '../graphql/queries'
import Post from './post'

function feed() {
    const { data, error } = useQuery(GET_ALL_POSTS)
    console.log(error)

  const posts: Post[] = data?.getPostList
    return (
    <div className='m-5 space-y-3'>
        {posts?.map(post => (
            <Post key={post.id} post={post}/>
        ))}
    </div>
  )
}

export default feed