

import {useEffect,useState} from 'react'
import { withRouter, Link } from "react-router-dom"
import { Grid, Label, Form , Button, Icon, Card, Loader, Dimmer, Segment, Image } from "semantic-ui-react"
import PostCard from '../components/PostCard'

import { useMutation, useQuery  , NetworkStatus} from "@apollo/client"
import { GET_POSTS_QUERY } from '../graphql/query'
import { CREATE_POST_MUTATION } from '../graphql/mutation'

import 'semantic-ui-css/semantic.min.css'
import './dash.css'

const Dash = () => {
    
    let {error,loading,data,refetch} = useQuery(GET_POSTS_QUERY,{
        onError(error){
            console.log(error)
        }
    })

    let [post ,setPost] = useState([])

    const [ creatingPost, setCreatingPost ] = useState({
        'message' : ''
    })

    const onChange = (e) => {
        const { name,value } = e.target
        setCreatingPost( (val) => ({ ...val, [name]:value }) )
    }

    const [ createPost ] = useMutation(CREATE_POST_MUTATION, {
        update(proxy,result){    
            refetch()  
        },
        onError(error){
            console.log(error)
        }
    })

    const makePost = (e) => {
        createPost({
            variables:{
                body : creatingPost.message
            }
        })
    }


    useEffect( () => {
        
        if(data ){
            refetch()
            setPost( data.getPost )
        }
       
    },[data])

    
    return(
        <div className = "home">
            <Grid columns = {2} divided>
                <Grid.Row>
                    <Grid.Column width = {12} >

                        <Grid columns = {2}>
                            <Grid.Row>
                                <Grid.Column width = {12}>
                                    <Form>
                                        <Form.TextArea 
                                            size = 'tiny'
                                            placeholder = "Input text here..."
                                            name = 'message'
                                            value = {creatingPost.message}
                                            onChange = {onChange}
                                        /> 
                                    </Form>
                                </Grid.Column>
                                <Grid.Column width = {4} className = "center-me">
                                    <Button
                                        primary
                                        onClick = {makePost}
                                        > Post 
                                    </Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                        <Grid>
                        {       
                            post.map( (e) => (
                                    <PostCard key = { e._id } data = {e} />
                                )
                            )    
                        }

                        </Grid>

                    </Grid.Column>
                    <Grid.Column width = {4}>
                        <Grid columns = {1}>
                            <Grid.Row>
                                <Grid.Column>
                                   <Label as = {Link} to = '/messages'> Messages </Label>
                                </Grid.Column>
                                <Grid.Column>
                                   <Label as = {Link} to = '/notification'> Notification </Label>
                                </Grid.Column>
                                <Grid.Column>
                                   <Label as = {Link} to = '/request'> Request </Label>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Label as = {Link} to = '/setting'> Setting </Label>
                                </Grid.Column>
                                <Grid.Column>
                                    <Label>Likes 44</Label>
                                    <Label>Posts 55</Label>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default withRouter(Dash)