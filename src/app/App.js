import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NavBar from './components/navBar'
import Main from './layouts/main'
import Login from './layouts/login'
import Users from './layouts/users'

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users/:userID?" component={Users} />
      </Switch>
    </div>
  )
}

export default App
