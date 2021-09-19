
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
           
        }
    }
`
export const GET_CL_QUERY = gql`
    query {
        getPost {
            countComment
            countLike
        }
    }
`

export const GET_COMMENT_QUERY = gql`
    query getComment(  
        $postId: String
        $skip: Int
        $limit: Int
    ) {
        getComment (
            postId: $postId
            skip: $skip
            limit : $limit
        ) {
            _id
            body
            firstName
            createdAt
            commentLikes
        }
    }
`