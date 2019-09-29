import React, { Component } from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// redux stuff
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/authActions'

// pages
import HomePage from './pages/HomePage'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import AppNavbar from './components/generic/AppNavbar'
import CommitteesPage from './pages/CommitteesPage'
import Register from './pages/Register'
import Login from './pages/Login'
import HeadAddSlots from './pages/HeadAddSlots'
import About from './pages/About'
import LandingPage from './views/LandingPage'

// import './App.css'
// import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser())
  }
  render() {
    return (
      <Provider store={store}>
        <React.Fragment >
          <Router >
            {/* <AppNavbar/> */}
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/committees' component={CommitteesPage} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/headAddSlots' component={HeadAddSlots} />
              <Route exact path='/about' component={About} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/landing' component={LandingPage} />
              <Route exact path='/*' component={NotFound} />
            </Switch>
          </Router>
        </React.Fragment>
      </Provider>
    )
  }
}

export default App
