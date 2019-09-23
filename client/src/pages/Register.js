import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Axios from 'axios';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import { Spinner } from 'reactstrap';
import { Progress } from 'reactstrap';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

class Register extends Component {
  state={
      committees:[],
      loaded:false
  }

  

  componentDidMount(){
      Axios.get('/api/committees')
      .then(res=>this.setState({
        committees:res.data.data,
        loaded:true
      }))
      .catch(err=>console.log(err))
  }
  
    render () {
    return this.state.loaded ?
    (
        <div>
        <h1>Registeration</h1>
        <p>keyboard buttons swipe back and forth to complete Registeration</p>
            <BindKeyboardSwipeableViews>
            <div>
            <div className="text-center">progress 0%</div>
            <Progress/>
            <Form>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="test@mail.com" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleName">FullName</Label>
          <Input type="name" name="name" id="exampleName" placeholder="jane doe" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelectFirst">First prefrence</Label>
          <Input type="select" name="select" id="exampleSelectFirst">
            {this.state.committees.map(committee=><option>{committee.name}</option>)}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelectSecond">Second prefrence</Label>
          <Input type="select" name="select" id="exampleSelectSecond">
            {this.state.committees.map(committee=><option>{committee.name}</option>)}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">Why did you apply for this committee?</Label>
          <Input type="textarea" name="text" id="exampleText" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
        </div>

        <div>
            <div className="text-center">progress 50%</div>
            <Progress value="50" />
            <p>test swipe</p>
        </div>
        </BindKeyboardSwipeableViews>
        </div>

    )
    :
    (
        <div>
            <p>loading please wait</p>
            <Spinner color="primary" /><Spinner color="primary" />
        </div>
    )
  }
}

export default Register
