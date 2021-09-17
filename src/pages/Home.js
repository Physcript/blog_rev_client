
import {Container,Button,Grid,Card,Icon, Label,Form, GridColumn, Message} from 'semantic-ui-react'

import {useState} from 'react'

import {useMutation} from '@apollo/client'
import {REGISTER_MUTATION} from '../graphql/mutation'

import 'semantic-ui-css/semantic.min.css'
import '../App.css'

const Home = () => {
    
    const [ registerData , setRegisterData ] = useState({
        "email": '',
        "password": '',
        "confirmPassword": '',
        "firstName": '',
        "lastName": ''
    })
    const [ registerError , setRegisterError] = useState({})
    const [ registerCreate , setRegisterCreate] = useState('')

    const description = [
        'Amy is a violinist with 2 years experience in the wedding industry.',
        'She enjoys the outdoors and currently resides in upstate New York.',
      ].join(' ')


    const [ createUser , {data,loading,error} ] = useMutation(REGISTER_MUTATION,{
        update(proxy,result){

            setRegisterError( (data) => ({
                "email": undefined,
                "password": undefined,
                "confirmPasswird": undefined,
                "firstName": undefined,
                "lastName": undefined
            }) )
            setRegisterData( (data) => ({
                "email":'',
                "password": '',
                "confirmPassword": '',
                "firstName": '',
                "lastName": ''
            }))

            setRegisterCreate(result.data.createUser)

        },onError(error){
            setRegisterError(error.graphQLErrors[0].extensions.errors)
        }
    })

    const onChange = (e) => {
        const {name,value} = e.target
        setRegisterData( (data) => ({ ...registerData, [name]:value }) )
    }

    const registerHandler = (e) => {
        e.preventDefault()
        createUser({
            variables: {
                email: registerData.email,
                password: registerData.password,
                confirmPassword: registerData.confirmPassword,
                firstName: registerData.firstName,
                lastName: registerData.lastName
            }
        })
        setRegisterCreate('')
    }

    return (

        <div className = 'home-page'>
            { registerCreate ? (
                <Message positive>
                    <p>{registerCreate}</p>
                </Message>
            ) : '' }
            { registerError.email || registerError.password || registerError.confirmPassword || registerError.lastName || registerError.firstName ? (
                <Message negative>
                    <p>{registerError.email}</p>
                    <p>{registerError.password}</p>
                    <p>{registerError.confirmPassword}</p>
                    <p>{registerError.firstName}</p>
                    <p>{registerError.lastName}</p>
                </Message>
            ) : ''}

            { !localStorage.getItem('token') ? (
                <section>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width = {8}>
                                <Label size = 'large'>Welcome</Label>
                                <Label size = "large">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </Label>
                                <Label>
                                <a href = "">Read more</a>
                                </Label>
                            </Grid.Column>
                            <Grid.Column width = {8}>
                                <Form>
                                    <Label size = "large">
                                        Register Now
                                    </Label>
                                    <Grid columns = {2} divided>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Form.Input 
                                                    size = 'mini'
                                                    placeholder = 'Email'
                                                    name = 'email'
                                                    value = {registerData.email}
                                                    onChange = {onChange}
                                                    error = { registerError.email ? true : false }
                                                />
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Form.Input 
                                                    size = 'mini'
                                                    placeholder = 'Password'
                                                    type = 'password'
                                                    name = 'password'
                                                    value = {registerData.password}
                                                    onChange = {onChange}
                                                    error = {registerError.password ? true : false }
                                                />
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Form.Input 
                                                    size = 'mini'
                                                    placeholder = 'Confirm Password'
                                                    type = 'password'
                                                    name = 'confirmPassword'
                                                    value = {registerData.confirmPassword}
                                                    onChange = {onChange}
                                                    error = {registerError.confirmPassword ? true : false }
                                                />
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Form.Input 
                                                    size = 'mini'
                                                    placeholder = 'Firstname'
                                                    name = 'firstName'
                                                    value = {registerData.firstName}
                                                    onChange = {onChange}
                                                    error = {registerError.firstName ? true : false }
                                                />
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Form.Input 
                                                    size = 'mini'
                                                    placeholder = 'Lastname'
                                                    name = 'lastName'
                                                    value = {registerData.lastName}
                                                    onChange = {onChange}
                                                    error = {registerError.lastName ? true : false }
                                                />
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row> 
                                            <Grid.Column>               
                                                <Button
                                                    primary 
                                                    size = 'mini'
                                                    onClick = {registerHandler}    
                                                >Register</Button>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>    
                </section>
            ) : '' }
            <section>
                <h1>Popular</h1>
                <Grid columns = {3}>
                    <Grid.Row>
                        <Grid.Column>
                            <Card>
                                <Card.Content header='About Amy' />
                                <Card.Content description={description} />
                                <Card.Content extra>
                                <Icon name='user' />4 Friends
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                            <Card>
                                <Card.Content header='About Amy' />
                                <Card.Content description={description} />
                                <Card.Content extra>
                                <Icon name='user' />4 Friends
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                            <Card>
                                <Card.Content header='About Amy' />
                                <Card.Content description={description} />
                                <Card.Content extra>
                                <Icon name='user' />4 Friends
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </section>
            <section>
                <h1>Newest</h1>
                    <Grid columns = {3}>
                        <Grid.Row>
                            <Grid.Column>
                                <Card>
                                    <Card.Content header='About Amy' />
                                    <Card.Content description={description} />
                                    <Card.Content extra>
                                    <Icon name='user' />4 Friends
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column>
                                <Card>
                                    <Card.Content header='About Amy' />
                                    <Card.Content description={description} />
                                    <Card.Content extra>
                                    <Icon name='user' />4 Friends
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column>
                                <Card>
                                    <Card.Content header='About Amy' />
                                    <Card.Content description={description} />
                                    <Card.Content extra>
                                    <Icon name='user' />4 Friends
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
            </section>
            <section>
            <h1>News</h1>
                <Grid columns = {3}>
                    <Grid.Row>
                        <Grid.Column>
                            <Card>
                                <Card.Content header='About Amy' />
                                <Card.Content description={description} />
                                <Card.Content extra>
                                <Icon name='user' />4 Friends
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                            <Card>
                                <Card.Content header='About Amy' />
                                <Card.Content description={description} />
                                <Card.Content extra>
                                <Icon name='user' />4 Friends
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                            <Card>
                                <Card.Content header='About Amy' />
                                <Card.Content description={description} />
                                <Card.Content extra>
                                <Icon name='user' />4 Friends
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </section>
        </div>
    )
}

export default Home