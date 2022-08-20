import { gql } from "@apollo/client";

export const GET_TAG_BY_TOPIC = gql`
    query MyQuery($topic: String!) {
        getTagsListByTopic(topic: $topic) {
            id
            topic
            created_at
        }
    }
`