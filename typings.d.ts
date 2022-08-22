type Comments = {
    created_at: string
    id: number
    post_id: number
    text: string
    username: string
}

type Votes = {
    created_at: string
    id: number
    post_id: number
    votes: boolean
    username: string
}

type Tags = {
    created_at: string
    id: number
    post_id: number
    topic: string
}

type Post = {
    created_at: string
    body: string
    id: number
    image: string
    title: string
    tags_id: string
    username: string
    votes: Votes[]
    comments: Comments[]
    tags: Tags[]
}