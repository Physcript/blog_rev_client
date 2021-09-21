
import React, { Component , useState , useEffect } from 'react'
import {Menu,Form,Grid,Input,Button, Label} from 'semantic-ui-react'
import {useHistory, Link} from 'react-router-dom'

import {LOGIN_MUTATION} from '../graphql/mutation'
import {useMutation} from '@apollo/client'

import Profile from '../pages/Profile'

import 'semantic-ui-css/semantic.min.css'
import './headers.css';



const Headers = () =>  {

    const history = useHistory()

    const [loginData , setLoginData] = useState({
        'email':'',
        'password': ''
    })

    const [myData , setMyData] = useState({})
    const [loginError , setLoginError] = useState({})

    const onChange = (e) => {
        const {name,value} = e.target
        setLoginData( data => ({...loginData,[name]:value }))
    }

    const [ login , { data,loading,error } ] = useMutation(LOGIN_MUTATION, {
        update(proxy,result){
            setLoginError('')
            localStorage.setItem('token', result.data.login.token)
            localStorage.setItem('name', (result.data.login.firstName))
            localStorage.setItem('_id', result.data.login._id )
            setMyData( data => 
                ({
                    'name': localStorage.getItem('name')
                })
            )
            window.location.href = 'https://naughty-borg-a0db40.netlify.app/post'

        },onError(error){
            setLoginError(error.graphQLErrors[0].extensions)
        }
    })
    
    const loginHandler = (e) => {
        e.preventDefault()
        login({
            variables: {
                email: loginData.email,
                password: loginData.password
            }
        })
    }

    

    const logoutHandler = (e) => {
        e.preventDefault()
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        window.location.href = 'https://naughty-borg-a0db40.netlify.app/'   
    }

    const myUrl = `/profile/${localStorage.getItem('_id')}`
    
    useEffect( () => {

        if(localStorage.getItem('name')){
            setMyData( data => 
                ({
                    'name': localStorage.getItem('name')
                })
            )
        }
        
    },[])

    return (
        <div className = "header">
            <Menu pointing secondary >

            <Menu.Item
                name='News Blog'
                as = {Link}
                to = '/'
            />
            { localStorage.getItem('name') ? (
                <Menu.Item
                    name = 'Post'
                    as = {Link}
                    to = '/home'
                />
                ) : '' 
            }

            <Menu.Item
                position = 'right'
                as = {Link}
                to = '/'
            >
                <Form>
                    <Form.Input
                        placeholder = 'Search user'
                        size = 'mini'
                        className = 'search_input'
                    ></Form.Input>
                </Form>
            </ Menu.Item>

            <Menu.Menu position='right' className = "header-login">
                { loginError.title ? (
                    <Label className = 'error' > {loginError.title} </Label>
                ) : '' }

                { localStorage.getItem('name') ? (
                    <>
                    
                    <Menu.Item
                        name = {myData.name}
                        as = {Link}
                        to = {myUrl} 
                    />
                     <Menu.Item
                        primary
                        name = 'Logout'
                        as = {Link}
                        to = '/'
                        onClick = {logoutHandler}
                    />
                    </>
                ) : (   
                    <>             
                    <Form.Input
                        size = 'mini'
                        placeholder = "abc@yahoo.com"
                        name = 'email'
                        value = {loginData.email}
                        onChange = {onChange}
                    />
                <Input
                        size = 'mini'
                        type = 'password'
                        placeholder = "Password"
                        name = 'password'
                        onChange = {onChange}
                />

                    <Button 
                        size = 'mini'
                        primary
                        onClick = {loginHandler}
                    >Login
                    </Button>

                </>
                )}
            </Menu.Menu>
            </Menu>
      </div>
    )
    
}

export default Headers
