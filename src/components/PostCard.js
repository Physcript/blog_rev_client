
import React,{ useState, useEffect } from 'react'
import { Grid, Label, Form , Button, Icon, Card , Menu , Dropdown , Modal} from "semantic-ui-react"
import CommentCard from './CommentCard'
import moment from 'moment'

// graphq
import { useQuery , useMutation  } from '@apollo/client'
import { GET_COMMENT_QUERY , GET_CL_QUERY , GET_ACTION_QUERY} from '../graphql/query'
import { CREATE_COMMENT_MUTATION , CREATE_LIKE_MUTATION , UPDATE_POST_MUTATION} from '../graphql/mutation'

import 'semantic-ui-css/semantic.min.css'
import './post-card.css'


// modal

function exampleReducer(state, action) {

    switch (action.type) {
      case 'OPEN_MODAL':
        return { open: true, dimmer: action.dimmer }
      case 'CLOSE_MODAL':
        return { open: false }
      default:
        throw new Error()   
    }
  }

const PostCard = ({ data }) => {
    const [ update , setUpdate ] = useState({
        body: ''
    })

    // modal
    const [state, dispatch] = React.useReducer(exampleReducer, {
        open: false,
        dimmer: undefined,
      })
    const { open, dimmer } = state

    

    let [ post , setPost ] = useState({
        _id : data._id,
        firstName : data.firstName,
        body: data.body.length >= 150 ? data.body.slice(0,150) : data.body,
        createdAt: data.createdAt,
        countLike: data.countLike,
        countComment: data.countComment,
        user: data.user,
        action: false
    })


    let [ postCommentLike , setPostCommentLike ] = useState({
        countLike:0,
        counntComment:0
    })

    const [ createLike ] = useMutation(  CREATE_LIKE_MUTATION , {
        update(proxy,result){
            setPost( (e) => ({ ...e, "countLike" : result.data.createLike }) )
        }
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

    const likeHandler = (e) => {
        e.preventDefault()
        createLike({
            variables:{
                id: post._id
            }
        })
        

    }

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

    const onChangeUpdate = (e) => {
        const {name,value} = e.target
        setUpdate( (val) => ({ ...val, [name]:value }) )
        console.log(update.body)
    }



    const [updatePostHandler] = useMutation(UPDATE_POST_MUTATION, {
        update( proxy, result ){
            setPost( (val) => ({ ...val, "body": update.body }) )
        },onError(error){
            console.log(error.graphQLErrors[0].extensions.errors)
        }
    })

    const updateHandler = (e) => {
        e.preventDefault()
        dispatch({ type: 'CLOSE_MODAL' })
        updatePostHandler({
            variables:{
                postId: post._id,
                body: update.body
            }
        })
    }
    
    const showComment = (e) => {

        e.preventDefault()
        if( util.limit == 1 && util.skip == 0  ){
            setUtil( (e) => ({ "skip": 0, "limit": 5 }) )
        }else if( post.countComment > util.skip + 4 ){
            setUtil( (e) => ({ "skip": e.skip += 5 , "limit" : 5}) )
        }
        
    }

    const editPost = (e) => {
        e.preventDefault()
        dispatch({ type: 'OPEN_MODAL', dimmer: 'inverted' })
    }
    
    const myAction = useQuery( GET_ACTION_QUERY , {
        variables:{
            postId:post._id
        }
    })

    const checkEditButton = (e) => {
        e.preventDefault()
        if( myAction.data ){
            setPost( (val) => ({ ...val, "action": myAction.data.checkAction }))
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
            <Grid columns = {2}>
                <Grid.Row>
                    <Grid.Column width = {12}>
                        <Card.Content header = { post.firstName } />
                    </Grid.Column>
                    <Grid.Column width = {4}>
                      <Dropdown icon = "ellipsis vertical" onClick = { checkEditButton }>
                          { post.action ? (

                            <Dropdown.Menu>
                                <div className = "dropbox">
                                    <Button className = "ui button basic" onClick = {editPost}>Edit Post</Button>
                                    <Button className = "ui button basic" onClick = {editPost}>Delete Post</Button>
                                </div>
                            </Dropdown.Menu>
                          ) : (

                            <Dropdown.Menu>
                                <div className = "dropbox">
                                    <Button className = "ui button basic" onClick>Post Info</Button>
                                    <Button className = "ui button basic" onClick >Check Profile</Button>
                                </div>
                            </Dropdown.Menu>
                          )  }
                      </Dropdown>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
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

                <Button>  <Icon name = "comments" />  Comment  {post.countComment} </Button> 
                <Button onClick = {likeHandler} > <Icon name = "heart" />  Like {post.countLike} </Button>
                 
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
                         

            
            <Modal
                size = 'mini'
                dimmer={dimmer}
                open={open}
                onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
            >
                <Grid columns = {2}>
                    <Grid.Row>
                        <Grid.Column width = {12} className = "grid-header" >
                            <Label> Edit Post </Label>
                        </Grid.Column>
                        <Grid.Column width = {4} className = "center-me">
                            <Button
                                size = 'mini'
                                circular
                                > X 
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Label size = 'large' className = 'no-margin-top' >{localStorage.getItem('name')}</Label> <br />
                            <Label size = 'tiny'> { moment(post.createdAt).fromNow()  } </Label>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width = {10}>
                            <Form>
                                <Form.TextArea
                                    size = 'tiny'
                                    placeholder = "Input text here..."
                                    name = 'body' 
                                    value = {update.body}
                                    onChange = {onChangeUpdate}
                                    >
                                    { post.body }
                                </Form.TextArea>
                            </Form>
                        </Grid.Column>
                        <Grid.Column width = {6}>
                            <Button 
                                size = 'mini'
                                onClick = { updateHandler }
                                > Update 
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Modal>
            
        </Card>
    )
}

export default PostCard