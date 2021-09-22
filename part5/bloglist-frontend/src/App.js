import React, { useState, useEffect, useRef } from 'react'
import Home from "./components/Home"
import Hero from "./components/Hero"
import Users from "./components/Users"
import User from "./components/User"
import BlogView from "./components/BlogView"

import { BrowserRouter as Router , 
          Switch, Route, Link} from 'react-router-dom'
import { AppBar, Container, Toolbar, Button } from '@material-ui/core'

const App = () => {

  const padding = {
    padding : 5
  }

  return (
    <Container>
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            home
          </Button>
          <Button color="inherit" component={Link} to="/blogs">
            blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
        </Toolbar>
      </AppBar>
      <Hero/>
      <Switch>
        <Route path="/blogs/:id">
          <BlogView/>
        </Route>
        <Route path="/users/:id">
          <User/>
        </Route>
        <Route path="/users">
          <Users/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Router>
    </Container>
  )
}

export default App