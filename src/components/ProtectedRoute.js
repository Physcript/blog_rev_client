
import React , { useState } from 'react'
import { Route , Redirect } from 'react-router-dom'
    
const ProtectedRoute = ({component: Component , ...rest }) => {
    const [isAuth , setIsAuth] = useState(false)

    return(
        <Route {...rest } render = { (props) =>{
            const isAuth = localStorage.getItem('token')
            if (isAuth){
                return <Component />
            }else {
                return <Redirect to = {{ pathname: '/' , state: { from: props.location } }} />
            } 
        }} /> 
    )
}

export default ProtectedRoute