import { useRouter } from 'next/router'
import React from 'react'
import { GET_ALL_POSTS_BY_POST_ID } from '../../graphql/queries'
import Post from '../../components/post'
import { useQuery } from '@apollo/client'

function PostPage() {
    const router = useRouter()
    const { data} = useQuery(GET_ALL_POSTS_BY_POST_ID, {
        variables: {
            post_id: router.query.postId
        }
    })
    const post: Post = data?.getPostListByPostId;
  return (
    <div>
        <Post post={post}/>
    </div>
  )
}

export default PostPage