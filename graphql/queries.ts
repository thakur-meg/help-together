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

export const GET_TAG_BY_TOPIC = gql`
    query MyQuery($topic: String!) {
        getTagsListByTopic(topic: $topic) {
            id
            topic
            created_at
        }
    }
`