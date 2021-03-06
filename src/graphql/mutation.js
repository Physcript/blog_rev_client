
import {gql} from '@apollo/client'

export const LOGIN_MUTATION = gql`
    mutation login(
        $email:String
        $password:String
    ){
        login(
            email:$email
            password:$password
        ){
            _id
            email
            createdAt
            firstName
            token
        }
    }
`
export const REGISTER_MUTATION = gql`
    mutation createUser(
        $email:String
        $password:String
        $confirmPassword:String
        $firstName:String
        $lastName:String
    ){
        createUser(
            email:$email
            password:$password
            confirmPassword:$confirmPassword
            firstName:$firstName
            lastName:$lastName
        )
    }
`

export const CREATE_POST_MUTATION = gql`
    mutation createPost(
        $body:String
    ){
        createPost(
            body:$body
        )
    }
`

export const CREATE_COMMENT_MUTATION = gql`
    mutation createComment (
        $body:String
        $postId:String
    ){
        createComment(
            body:$body
            postId:$postId
        ){
            _id
            body
            firstName
            createdAt
        }
    }
`


export const CREATE_LIKE_MUTATION = gql`
    mutation createLike(
        $id:String
    ){
        createLike(
            id:$id
        )
    }
`

export const UPDATE_POST_MUTATION = gql`
    mutation updatePost(
        $postId:String
        $body:String
    ){
        updatePost(
            postId:$postId
            body:$body
        )
    }

`


export const DELETE_POST_MUTATION = gql`
    mutation deletePost(
        $postId:String
    ){
        deletePost(
            postId:$postId
        )
    }
`

export const GET_PROFILE_MUTATION = gql`
    mutation getProfile(
        $id:String
    ){
        getProfile(
            id:$id
        ){
            firstName
            lastName
            email
            createdAt
        }
    }
`

export const TOTAL_COUNT_COMMENT_MUTATION = gql`
    mutation getCommentCount( 
        $postId:String
    ){
        getCommentCount(
            postId:$postId
        )
    }
`