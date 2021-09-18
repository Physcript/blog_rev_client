import { useState } from 'react'
import { Label, Icon, Card } from "semantic-ui-react"

import moment from "moment"

import {useQuery} from '@apollo/client'


import 'semantic-ui-css/semantic.min.css'
import './comment-card.css'

const CommentCard = ({comment}) => {
    const [myComment, setMyComment] = useState([])

    const [ data  , setData ] = useState({
        body: (comment ? comment.body : '') ,
        name: (comment ? comment.firstName : ''),
        createdAt : (comment ? comment.createdAt :'' )
    })
    
    return (
        <Card key = {comment.id}>
          <Card.Content header = {data.name} size = 'large' />

          <Label size = 'tiny'>
                { moment(data.createdAt).fromNow()}
              </Label>
          <Card.Content description = 
              {data.body}>
          </Card.Content>
          <Label> <Icon name = "heart" />  Like 0 </Label>
        </Card>
    )
}

export default CommentCard