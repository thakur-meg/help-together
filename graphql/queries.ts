import { gql } from "@apollo/client";
export const GET_ALL_POSTS = gql `
    query MyQuery {
        getPostList {
            body
            created_at
            id
            image
            title
            tags_id
            username

            comments {
                created_at
                id
                post_id
                text
                username
            }
            tags {
                created_at
                id
                topic
            }
            votes {
                created_at
                id
                post_id
                votes
                username
            }
    }
    }
`
export const GET_ALL_POSTS_BY_TOPIC = gql `
    query MyQuery ($topic: String!) {
        getPostListByTopic(topic: $topic) {
            body
            created_at
            id
            image
            title
            tags_id
            username

            comments {
                created_at
                id
                post_id
                text
                username
            }
            tags {
                created_at
                id
                topic
            }
            votes {
                created_at
                id
                post_id
                votes
                username
        }
    }
    }
`
export const GET_ALL_POSTS_BY_POST_ID = gql `
    query MyQuery ($post_id: ID!) {
        getPostListByPostId(post_id: $post_id) {
            body
            created_at
            id
            image
            title
            tags_id
            username

            comments {
                created_at
                id
                post_id
                text
                username
            }
            tags {
                created_at
                id
                topic
            }
            votes {
                created_at
                id
                post_id
                votes
                username
        }
    }
    }
`

export const GET_TAG_BY_TOPIC = gql`
    query MyQuery($topic: String!) {
        getTagsListByTopic(topic: $topic) {
            id
            topic
            created_at
        }
    }
`

export const GET_VOTES_BY_POST_ID = gql`
    query MyQuery($post_id: ID!) {
        getVotesByPostId(post_id: $post_id) {
            post_id
            id
            votes
            created_at
        }
    }
`