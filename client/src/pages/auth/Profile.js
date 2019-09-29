import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {Alert,Button,Container} from 'reactstrap'
import ScheduleModal from './components/ScheduleModal'
import SchedulesList from './components/SchedulesList'

class Profile extends Component {

  static propTypes = {
        isAuthenticated:PropTypes.bool,
        error:PropTypes.object.isRequired,
        user:PropTypes.object.isRequired
      }

  

    render () {
    return ( 
        
        this.props.isAuthenticated?
        <div>
            <h1>welcome {this.props.user.fullName}</h1>
            <Container>
            <ScheduleModal />
            <SchedulesList />
          </Container>
        </div>
        :
        <Alert color="danger">Please login first to access this page</Alert>
    )
  }
}

const mapStateToProps = state =>({
    isAuthenticated:state.auth.isAuthenticated,
    error:state.error,
    user:state.auth.user,
    type:state.auth.type
  })
  
  
  export default connect(
    mapStateToProps,
    {}
  )(Profile)
