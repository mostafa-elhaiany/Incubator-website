import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Alert} from 'reactstrap'
class Profile extends Component {

    state={

    }


    static propTypes = {
        isAuthenticated:PropTypes.bool,
        user:PropTypes.object.isRequired,
        error:PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
      }
  
  
    render () {
        console.log(this.props)
        
    return (
        
        this.props.isAuthenticated?
        <div>
            <h1>welcome {this.props.user.fullName}</h1>

        </div>
        :
        <Alert color="danger">Please login first to access this page</Alert>
    )
  }
}

const mapStateToProps = state =>({
    isAuthenticated:state.auth.isAuthenticated,
    error:state.error,
    user:state.auth.data
  })
  
  
  export default connect(
    mapStateToProps,
    {}
  )(Profile)
