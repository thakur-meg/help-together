import { gql } from "@apollo/client";

export const ADD_POST = gql`
    mutation MyMutation(
        $body: String!
        $image: String!
        $tags_id: ID!
        $title: String!
        $username: String!
    ) {
        insertPost(
            body: $body
            image: $image
            tags_id: $tags_id
            title: $title
            username: $username
        ) {
            body
            created_at
            image
            tags_id
            title
            username
        }
    }
`

export const ADD_TAG = gql`
    mutation MyMutation($topic: String) {
        insertTag(topic: $topic) {
            id
            topic
            created_at
        }
    }
`
export const ADD_COMMENT = gql`
    mutation MyMutation($post_id: ID!, $username: String!, $text: String!) {
        insertComment(post_id: $post_id, text: $text, username: $username) {
            id
            post_id
            text
            username
        }
    }
`