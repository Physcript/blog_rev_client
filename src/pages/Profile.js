import moment from 'moment'

import {useParams} from 'react-router-dom'
import {useState,useEffect} from 'react'
import { useMutation } from '@apollo/client'
import { GET_PROFILE_MUTATION } from '../graphql/mutation'
import { Grid,Header,Label,Segment,Button,Icon} from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './Profile.css'

const Profile = () => {

    // mutation
    const [ myUser ] = useMutation( GET_PROFILE_MUTATION,{
        update( proxy,result ){
            setUser( result.data.getProfile )
        },onError(error){
            console.log(error)
        }
    })

    const { id } = useParams()
    
    const [ user , setUser ] = useState({})

    const getProfile = async (id) => {
        myUser({
            variables:{
                id
            }
        })
    }


    useEffect( () => {
        
        getProfile(id)

    },[])

    return(
        <Grid columns = {2} divided> 
            <Grid.Row>
                <Grid.Column width = { 4 } textAlign = 'center' >
                        <Segment className = "rows">
                           <Label size = 'big'>{ user.lastName } { user.firstName }</Label>
                           <Label size = 'tiny'>{ moment(user.createdAt).format('MMM Do YY') }</Label>
                        </Segment>
                        <Segment className = "rows">
                            <Button basic><Label>Message</Label></Button>
                            <Button basic><Label>Notification</Label></Button>
                            <Button basic><Label>Setting</Label></Button>
                        </Segment>
                        <Segment className = "rows">
                           <Label><Icon className = 'comments' />Posts 23</Label>
                           <Label><Icon className = 'heart' />Likes 56</Label>
                        </Segment>

                </Grid.Column>
                <Grid.Column width = { 12 }>
                        <Label>1</Label>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default Profile