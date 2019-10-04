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
class SessionsModal extends Component {
  state = {
    modal: false,
    slot: '',
    day:'',
    content:'',
    contentDescription:'',
    place:'',
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

    const newSession = {
      day: this.state.day,
      slot: this.state.slot,
      content: this.state.content,
      contentDescription: this.state.contentDescription,
      place:this.state.place,
      committee:this.props.committee
    };

      Axios.post('/api/sessions/',newSession)
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
            Add Session
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
                    <Label for="exampleSelectDay">Day</Label>
                    <Input type="select" name="day"  onChange={this.onChange}>
                        <option>Select Day</option>
                        <option>Saturday</option>
                        <option>Sunday</option>
                        <option>Monday</option>
                        <option>Tuesday</option>
                        <option>wednesday</option>
                        <option>Thursday</option>
                    </Input>
                </FormGroup>
                <Label for='item'>slot</Label>
                <Input
                  type='select'
                  name='slot'
                  placeholder='Add Schedule day'
                  onChange={this.onChange}
                >
                <option>Select Slot</option>
                <option>First</option>
                <option>Second</option>
                <option>Third</option>
                <option>Fourth</option>
                <option>Fifth</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for='item'>content</Label>
                <Input
                  type='text'
                  name='content'
                  placeholder='link to content'
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for='item'>content description</Label>
                <Input
                  type='text'
                  name='contentDescription'
                  placeholder='add a description to the content you did in that session'
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for='item'>place</Label>
                <Input
                  type='text'
                  name='place'
                  placeholder='the place where the session is held'
                  onChange={this.onChange}
                />
              </FormGroup>
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Add Session
                </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default SessionsModal