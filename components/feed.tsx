import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from '../graphql/queries'
import Post from './post'

type Props = {
    topic?: string
}


function feed({topic}: Props) {
    const { data, error } = !topic 
    ? useQuery(GET_ALL_POSTS) 
    :useQuery(GET_ALL_POSTS_BY_TOPIC, {
        variables: {
            topic: topic
        }
    })

  const posts: Post[] = !topic ? data?.getPostList : data?.getPostListByTopic
    console.log(error)
    return (
    <div className='m-5 space-y-3'>
        {posts?.map(post => (
            <Post key={post.id} post={post}/>
        ))}
    </div>
  )
}

export default feed