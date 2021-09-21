import { useState } from 'react'
import { Label, Icon, Card, Button } from "semantic-ui-react"

import moment from "moment"

import {useQuery,useMutation} from '@apollo/client'
import { CREATE_LIKE_MUTATION } from '../graphql/mutation'

import 'semantic-ui-css/semantic.min.css'
import './comment-card.css'

const CommentCard = ({comment}) => {
    const [myComment, setMyComment] = useState([])

    const [ data  , setData ] = useState({
        _id : ( comment ? comment._id : '' ) ,
        body: (comment ? comment.body : '') ,
        name: (comment ? comment.firstName : ''),
        createdAt : (comment ? comment.createdAt :'' ),
        countLike : (comment ? comment.commentLikes : '')
    })

    const [ creatingLike ] = useMutation(CREATE_LIKE_MUTATION, {
        update(proxy,result){
           setData( (e) => ({ ...e , "countLike": result.data.createLike }) )
        }
    })
    const likeHandler = (e) => {
        e.preventDefault()
        creatingLike({
            variables: {
                id: data._id
            }
        })
    }


    
    return (
        <Card key = {comment.id} className = "commentCard">
          <Card.Content header = {data.name} size = 'large' />

          <Label size = 'tiny'>
                { moment(data.createdAt).fromNow()}
              </Label>
          <Card.Content description = 
              {data.body}>
          </Card.Content>
          <Card.Content>
          <Button onClick = {likeHandler} > <Icon name = "heart" />  Like { data.countLike  } </Button>
          </Card.Content> <br/>
        </Card>
    )
}

export default CommentCard