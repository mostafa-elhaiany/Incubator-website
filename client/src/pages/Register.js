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
      schedules:[],
      loaded:false,
      percentage:0,
      email:"",
      name:"",
      password:"",
      Confirm:"",
      First:"",
      Second:"",
      why:""
  }

  Input = (e)=>{
    if(e.target.name==='email'){
      this.setState({email:e.target.value})
    }
    else if(e.target.name==='name'){
      this.setState({name:e.target.value})
    }
    else if(e.target.name==='password'){
      this.setState({password:e.target.value})
    }
    else if(e.target.name==='Confirmpassword'){
      if(e.target.value===this.state.password)
        this.setState({Confirm:e.target.value})
      else
        console.log('passwords must match')  
    }
    else if(e.target.name==='selectFirst'){
      console.log(e.target.value)
      this.setState({First:e.target.value})
    }
    else if(e.target.name==='selectSecond'){
      this.setState({Second:e.target.value})
    }
    else if(e.target.name==='text'){
      this.setState({why:e.target.value})
    }
  }
  submit = (e)=>{
    e.preventDefault()
    if(!this.state.firstSubmitted)
      this.setState({firstSubmitted:true, percentage:(1/3*100)})  
  }
  componentDidMount(){

      Axios.get('/api/schedules')
      .then(res=>{this.setState({
        schedules:res.data.data
      })})
      Axios.get('/api/committees')
      .then(res=>this.setState({
        committees:res.data.data,
        loaded:true
      }))
      .catch(err=>console.log(err))
  }
  
    render () {
      console.log(this.state)
    return this.state.loaded ?
    (
        <div>
            <div className="text-center">progress {this.state.percentage}%</div>
           
           {(this.state.percentage===0?
                <Progress/>
            :
            <Progress color="success" value="50" />)}
           
        <h1>Registeration</h1>
        <p>keyboard buttons swipe back and forth to complete Registeration</p>
            <BindKeyboardSwipeableViews>
            <div>
            <Form onSubmit={(e)=>this.submit(e)}>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="test@mail.com" onInput={(e)=>this.Input(e)}/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleName">FullName</Label>
          <Input type="name" name="name" id="exampleName" placeholder="jane doe" onInput={(e)=>this.Input(e)}/>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" onInput={(e)=>this.Input(e)}/>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Confirm Password</Label>
          <Input type="password" name="Confirmpassword" id="exampleConfirmPassword" placeholder="password placeholder" onInput={(e)=>this.Input(e)}/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelectFirst">First prefrence</Label>
          <Input type="select" name="selectFirst" id="exampleSelectFirst" onInput={(e)=>this.Input(e)}>
            {this.state.committees.map(committee=><option>{committee.name}</option>)}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelectSecond">Second prefrence</Label>
          <Input type="select" name="selectSecond" id="exampleSelectSecond" onInput={(e)=>this.Input(e)}>
            {this.state.committees.map(committee=><option>{committee.name}</option>)}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">Why did you apply for this committee?</Label>
          <Input type="textarea" name="text" id="exampleText" onInput={(e)=>this.Input(e)}/>
        </FormGroup>
        <Button onclick={(e)=>this.submit(e)}>Submit</Button>
      </Form>
        </div>

        <div>
            <h3>Choose  a reservation slot</h3>
            {this.state.schedules.map(schedule =>{
              if(!schedule.reserved)
                  return <Button className="btn btn-primary">Choose {schedule.day} {schedule.slot}</Button>
              else 
                  return <Button className="btn btn-danger">{schedule.day} {schedule.slot} reserved already!</Button>   
                 
            })}
        </div>

        <div>
            <h3>one more </h3>
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
