
import {useState, useEffect } from 'react'
import { Grid, Label, Form , Button, Icon, Card } from "semantic-ui-react"
import CommentCard from './CommentCard'
import moment from 'moment'

// graphq
import { useQuery } from '@apollo/client'
import { GET_COMMENT_QUERY } from '../graphql/query'

import 'semantic-ui-css/semantic.min.css'
import './post-card.css'

const PostCard = ({ data }) => {

    const [ post , setPost ] = useState({
        _id : data._id,
        firstName : data.firstName,
        body: data.body.length >= 150 ? data.body.slice(0,150) : data.body,
        createdAt: data.createdAt,
        countLike: data.countLike,
        countComment: data.countComment,
        comment: data.comment

    })

    let [ myComment , setMyComment ] = useState([])

    const [ show_more , setShow_more ] = useState({
        "title" : 'Show more'
    })
    
    let resultComment = useQuery(GET_COMMENT_QUERY, {
        variables:{
            postId: post._id
        }
    })

    useEffect( () => {
        if(resultComment.data){
           setMyComment( resultComment.data.getComment ) 
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
                <Label>  <Icon name = "comments" />  Comment  {myComment.length} </Label> 
                <Label> <Icon name = "heart" />  Like {post.countLike} </Label>
                <Card.Content extra>
                    <Form>
                    <Grid columns = {2} className = 'comment-field'>
                        <Grid.Row>
                            <Grid.Column width = {12}>
                                <Form.Input  size = 'tiny' placeholder = 'Add comment here..' />
                            </Grid.Column>
                            <Grid.Column width = {4}>
                                <Button size = 'tiny' primary > Comment </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    </Form>
                        {post.comment[0] ? (
                            <CommentCard comment = {post.comment} />
                        ) : '' }

                        { myComment.length >=  1 ?  (
                            <Label> Show more comment </Label>
                        ) : ''}
                    
                </Card.Content>
            </Card.Content>
                         
            
        </Card>
    )
}

export default PostCard