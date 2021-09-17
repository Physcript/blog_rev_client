
import {BrowserRouter as Router, Switch , Route, Link} from 'react-router-dom' 
import {Container} from 'semantic-ui-react'
import {useEffect, useState} from 'react'

import Headers from './components/Headers'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Dash from './pages/Dash'

import ProtectedRoute from './components/ProtectedRoute'

import 'semantic-ui-css/semantic.min.css'
import './App.css'

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Container>
            <Headers />
            <Route exact path = '/' component = {Home} > <Home /> </Route>
            <Route exact path = '/profile' component = {Profile}> <Profile /> </Route>
            {/* <Route exact path = '/home' component = {Dash}> <Dash /> </Route> */}
            <ProtectedRoute path = '/home' component = {Dash}  />
          </Container>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
