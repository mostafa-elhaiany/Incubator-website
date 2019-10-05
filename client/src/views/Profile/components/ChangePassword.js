import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap'
import Axios from 'axios';
class ChangePassword extends Component {
  state = {
    modal: false,
    password:'',
    newPassword:'',
    confirmPassword:'',
    message: null,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      message:null
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();

    const body = {
      password: this.state.password,
      newPassword: this.state.newPassword,
      confirmPassword:this.state.confirmPassword,
      type:this.props.type
    };

      Axios.put(`/api/auth/changePassword/${this.props.id}`,body,this.props.config)
      .then(res=>{
        console.log(res.data.data)
        this.toggle();
      })
      .catch(err=>this.setState({message:err.response.data.message}))
      
  }

  

  render() {
    return (
      <div>
          <Button
            color='dark'
            style={{ marginBottom: '2rem' }}
            onClick={this.toggle}
          >
            Change Password
          </Button>
        
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Sessions List</ModalHeader>
          <ModalBody>
           { this.state.message?
           <Alert color="danger">
            {this.state.message}
            </Alert>
            :
            <div>

            </div>}
            <Form onSubmit={this.onSubmit}>
              
              <FormGroup>
              <FormGroup>
                    <Label for="exampleSelectDay">Old Password</Label>
                    <Input type="password" name="password"  onChange={this.onChange}/>    
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelectDay">New Password</Label>
                    <Input type="password" name="newPassword"  onChange={this.onChange}/>    
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelectDay">Confirm new Password</Label>
                    <Input type="password" name="confirmPassword"  onChange={this.onChange}/>    
                </FormGroup>s
              </FormGroup>
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Done
                </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ChangePassword