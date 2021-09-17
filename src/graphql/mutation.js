
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