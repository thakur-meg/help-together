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