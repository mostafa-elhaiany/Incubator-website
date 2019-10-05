import React, { Component, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { LinearProgress } from '@material-ui/core';

// redux stuff
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/authActions'

// pages
import NotFound from './pages/NotFound'
// import HomePage from './pages/HomePage'
// import Profile from './pages/auth/Profile'
// import AppNavbar from './components/generic/AppNavbar'
// import CommitteesPage from './pages/Committee/CommitteesPage'
// import Register from './pages/auth/Register/Register'
// import Login from './pages/auth/Login/Login'
// import About from './pages/About'
// import UsersList from './pages/Users/UsersList'


// import './App.css'
// import 'bootstrap/dist/css/bootstrap.min.css'

const LandingPage = React.lazy(() => import('./views/LandingPage'));
const Register2 = React.lazy(() => import('views/Register'));
const Login2 = React.lazy(() => import('views/Login'));
const Profile2 = React.lazy(() => import('views/Profile'));
const About2 = React.lazy(() => import('views/About'));
const Committees2 = React.lazy(() => import('views/Committees'));
const UsersList2 = React.lazy(() => import('views/UsersList'));

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
            <Suspense fallback={<LinearProgress variant='determinate' value={100}></LinearProgress>}>
              <Switch>
                {/* <Route exact path='/' component={HomePage} />
                <Route exact path='/users/' component={UsersList} />
                <Route exact path='/committees' component={CommitteesPage} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/about' component={About} />
                <Route exact path='/profile' component={Profile} /> */}
                <Route exact path='/' component={LandingPage} />
                <Route exact path='/register' component={Register2} />
                <Route exact path='/login' component={Login2} />
                <Route exact path='/profile' component={Profile2} />
                <Route exact path='/about' component={About2} />
                <Route exact path='/committees' component={Committees2} />
                <Route exact path='/users/' component={UsersList2} />
                <Route exact path='/*' component={NotFound} />
              </Switch>
            </Suspense>
          </Router>
        </React.Fragment>
      </Provider>
    )
  }
}

export default App
