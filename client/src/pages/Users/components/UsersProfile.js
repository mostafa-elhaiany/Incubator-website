import React, { Component } from 'react'
import {Alert,Button,Table} from 'reactstrap'
class UsersProfile extends Component {
    

    render () {
    return ( 
        
        this.props.isAuthenticated?
        <div>
            <h1>{this.props.user.fullName}'s profile</h1>

            <Table>
        <thead>
          <tr>
            <th>GUC_ID</th>
            <th>First Preference</th>
            <th>Second Preference</th>
            <th>Why did you apply for this committee</th>
            <th>do you have any hobbies</th>
            <th>any background experience</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{this.props.user.GUC_ID}</td>
            <td>{this.props.user.firstPrefrence}</td>
            <td>{this.props.user.secondPrefrence}</td>
            <td>{this.props.user.why}</td>
            <td>{this.props.user.hobbies}</td>
            <td>{this.props.user.experience}</td>
          </tr>
        </tbody>
      </Table>

            <br/>
            <a className="btn btn-success" onClick={()=>{console.log('accepted')}}>accept</a>
            <a className="btn btn-danger" onClick={()=>{console.log('rejected')}}>reject</a>
            
<br/><br/>
            <Button onClick={this.props.goBack}>go Back</Button>
        </div>
        :
        <Alert color="danger">Please login first to access this page</Alert>
    )
  }
}


  
export default UsersProfile
