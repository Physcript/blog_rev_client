
import { useState, useEffect } from 'react'
import { Grid, Label, Form , Button, Icon, Card } from "semantic-ui-react"
import CommentCard from './CommentCard'
import moment from 'moment'

// graphq
import { useQuery , useMutation  } from '@apollo/client'
import { GET_COMMENT_QUERY } from '../graphql/query'
import { CREATE_COMMENT_MUTATION } from '../graphql/mutation'

import 'semantic-ui-css/semantic.min.css'
import './post-card.css'

const PostCard = ({ data }) => {

    

    let [ post , setPost ] = useState({
        _id : data._id,
        firstName : data.firstName,
        body: data.body.length >= 150 ? data.body.slice(0,150) : data.body,
        createdAt: data.createdAt,
        countLike: data.countLike,
        countComment: data.countComment,
        comment: data.comment

    })


    let [ myComment , setMyComment ] = useState([])

    const [ postComment , setPostComment ] = useState({
        'comment': ''
    })

    const [ createdComment, setCreatedComment ] = useState({})


    let [util,setUtil] = useState({
        "skip": 0,
        "limit": 1,
    })

    const [ show_more , setShow_more ] = useState({
        "title" : 'Show more'
    })
    
    let resultComment  = useQuery(GET_COMMENT_QUERY, {
        variables:{
            postId: post._id,
            skip: util.skip,
            limit: util.limit

        }
    })

    const [ creatingComment ] = useMutation(  CREATE_COMMENT_MUTATION , {
        update( proxy,result ) {

        resultComment.refetch()
        setUtil( (e) => ({ skip: 0 , limit: 1 }))

        },onError(error){
            console.log(error.graphQLErrors[0].extensions.errors)
        }
    })

    const commentHandler = (e) => {
        e.preventDefault()
        creatingComment({
            variables:{
                postId: post._id,
                body: postComment.comment
            }
        })
    } 

    const onChange = (e) => {
        const {name,value} = e.target
        setPostComment( (val) => ({ ...val, [name]: value}) )
    }
    
    const showComment = (e) => {
        e.preventDefault()
        if( util.limit == 1 && util.skip == 0  ){
            setUtil( (e) => ({ "skip": 0, "limit": 5 }) )
        }else if( post.countComment > util.skip + 5 ){
            setUtil( (e) => ({ "skip": e.skip += 5 , "limit" : 5}) )
            console.log( post.countComment )
            console.log(util.skip)
        } else {
            console.log( post.countComment )
            console.log(util.skip)
        }
        
    }

    useEffect( () => {
        if(resultComment.data){
           setMyComment( resultComment.data.getComment )
           resultComment.refetch()
        }



    },[resultComment])

    

    return(
        <Card>
            
            <Card.Content header = { post.firstName } />
            <Label size = 'tiny' className = "large-label">{  moment(post.createdAt).fromNow()}</Label>
            
            <Card.Content description = { 
                <div className = "word-break" id = { data._id }>
                     <Label>{post.body}</Label>
                     { post.body.length >= 150 ?  (
                        <Label onClick = { (e) => {
                        e.preventDefault()
                        if( show_more.title == 'Show more' ){
                            setPost( (val) => ({ ...val, body: data.body }) )
                            setShow_more( (e) => ( { 'title': 'Show less'} ))
                        }else {
                            setPost((val) => ({ ...val ,  body: data.body.slice(0,150) }))
                            setShow_more( (e) => ( { 'title': 'Show more'} ))
                        }
                        }} > {show_more.title}</Label>
                        ) : '' }
                </div>
            } />
            <Card.Content extra>
                <Label>  <Icon name = "comments" />  Comment  {post.countComment} </Label> 
                <Label> <Icon name = "heart" />  Like {post.countLike} </Label>
                <Card.Content extra>
                    <Form>
                    <Grid columns = {2} className = 'comment-field'>
                        <Grid.Row>
                            <Grid.Column width = {12}>
                                <Form.Input  
                                    size = 'mini' 
                                    placeholder = 'Add comment here..'
                                    name = "comment"
                                    value = {postComment.comment}
                                    onChange = {onChange}
                                    />
                            </Grid.Column>
                            <Grid.Column width = {4}>
                                <Button 
                                    size = 'tiny' 
                                    primary 
                                    onClick = {commentHandler}
                                    > Comment </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    </Form>

                        { myComment.map( (val) => { return (
                            <CommentCard key = {val._id} comment = {val} />
                        ) } ) }

                        { myComment.length >=  1 ?  (
                            <Label onClick = {showComment} > Show more comment </Label>
                        ) : ''}
                    
                </Card.Content>
            </Card.Content>
                         
            
        </Card>
    )
}

export default PostCard