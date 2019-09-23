import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import AppNavbar from './components/generic/AppNavbar'
import CommitteesPage from './pages/CommitteesPage'
import Register from './pages/Register'
import Login from './pages/Login'

class App extends Component {
  render () {
    return (
      <React.Fragment >
        <Router >
          <AppNavbar/>
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/committees' component={CommitteesPage} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/*' component={NotFound} />
            </Switch>
        </Router>
      </React.Fragment>
    )
  }
}

export default App
