import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import AppNavbar from './components/generic/AppNavbar'
import CommitteesPage from './pages/Committee/CommitteesPage'
import Register from './pages/auth/Register/Register'
import Login from './pages/auth/Login/Login'
import HeadAddSlots from './pages/HeadAddSlots'
import About from './pages/About'
import {loadUser} from './actions/authActions'
import {Provider} from 'react-redux'
import store from './store'
import Profile from './pages/auth/Profile'
import UsersList from './pages/Users/UsersList'
class App extends Component {
  componentDidMount(){
    store.dispatch(loadUser())
  }

  render () {
    return (
      <Provider store={store}>
      <React.Fragment >
        <Router >
          <AppNavbar/>
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/users/' component={UsersList} />
              <Route exact path='/committees' component={CommitteesPage} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/headAddSlots' component={HeadAddSlots} />
              <Route exact path='/about' component={About} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/*' component={NotFound} />
            </Switch>
        </Router>
      </React.Fragment>
      </Provider>
    )
  }
}

export default App
