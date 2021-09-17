
import { gql } from '@apollo/client'

export const GET_POSTS_QUERY = gql`
    query {
        getPost {
            _id
            body
            createdAt
            firstName
            countComment
            countLike
            comment{
                body
                firstName
                createdAt
            }
        }
    }
`

export const GET_COMMENT_QUERY = gql`
    query getComment(  
        $postId: String
    ) {
        getComment (
            postId: $postId
        ) {
            _id
            body
            firstName
            createdAt
        }
    }
`