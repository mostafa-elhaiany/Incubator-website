import React, { Component } from 'react'
import {Alert,Button} from 'reactstrap'
class UsersProfile extends Component {
    

    render () {
    return ( 
        
        this.props.isAuthenticated?
        <div>
            <h1>{this.props.user.fullName}'s profile</h1>

            <p>{this.props.user.type}</p>
            

            <Button onClick={this.props.goBack}>go Back</Button>
        </div>
        :
        <Alert color="danger">Please login first to access this page</Alert>
    )
  }
}


  
export default UsersProfile
