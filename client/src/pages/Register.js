import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import Axios from 'axios';
import SwipeableViews from 'react-swipeable-views';
import { Spinner } from 'reactstrap';
import { Progress } from 'reactstrap';
import { Table } from 'reactstrap';
//import { bindKeyboard } from 'react-swipeable-views-utils';

//const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

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
      why:"",
      day:"",
      slot:"",
      validEmail:"",
      validName:"",
      validPassword:"",
      validConfirm:"",
      validWhy:"",
      errorMsgConfirm:"",
      errorMsgEmail:"",
      errorMsgName:"",
      errorMsgPassword:"",
      errorMsgWhy:"",
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
  Reserve= (schedule)=>{
    this.setState({
      slot:schedule.slot,
      day:schedule.day
    })
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
            <Progress color="success" value={this.state.percentage} />)}
           
        <h1>Registeration</h1>
        <p>keyboard buttons swipe back and forth to complete Registeration</p>
            {/* <BindKeyboardSwipeableViews> */}
            <Form onSubmit={(e)=>this.submit(e)}>
            <SwipeableViews enableMouseEvents>
            <div>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="test@mail.com" onInput={(e)=>this.Input(e)}
           valid={this.state.validEmail === 'safe'}
           invalid={this.state.validEmail === 'danger'}
          />
          <FormFeedback valid>
            All good!
          </FormFeedback>
          <FormFeedback>
            {`Uh Oh! ${this.state.errorMsgEmail}`}
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="exampleName">FullName</Label>
          <Input type="name" name="name" id="exampleName" placeholder="jane doe" onInput={(e)=>this.Input(e)}
          valid={this.state.validName === 'safe'}
          invalid={this.state.validName === 'danger'}
         />
         <FormFeedback valid>
           All good!
         </FormFeedback>
         <FormFeedback>
           {`Uh Oh! ${this.state.errorMsgName}`}
         </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" onInput={(e)=>this.Input(e)}
           valid={this.state.validPassword === 'safe'}
           invalid={this.state.validPassword === 'danger'}
          />
          <FormFeedback valid>
            All good!
          </FormFeedback>
          <FormFeedback>
            {`Uh Oh! ${this.state.errorMsgPassword}`}
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Confirm Password</Label>
          <Input type="password" name="Confirmpassword" id="exampleConfirmPassword" placeholder="password placeholder" onInput={(e)=>this.Input(e)}
           valid={this.state.validConfirm === 'safe'}
           invalid={this.state.validConfirm === 'danger'}
          />
          <FormFeedback valid>
            All good!
          </FormFeedback>
          <FormFeedback>
            {`Uh Oh! ${this.state.errorMsgConfirm}`}
          </FormFeedback>
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
          <Input type="textarea" name="text" id="exampleText" onInput={(e)=>this.Input(e)}
           valid={this.state.validWhy === 'safe'}
           invalid={this.state.validWhy === 'danger'}
          />
          <FormFeedback valid>
            All good!
          </FormFeedback>
          <FormFeedback>
            {`Uh Oh! ${this.state.errorMsgWhy}`}
          </FormFeedback>
        </FormGroup>
        </div>

        <div>
            <h3>Choose  a reservation slot</h3>

            <Table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Slot</th>
                <th>Reserve</th>
              </tr>
            </thead>
            <tbody>
              {this.state.schedules.map(schedule =>{
              const x= (
                <tr>
                <td>{schedule.day}</td>
                <td>{schedule.slot}</td>
                <td>{
                  !schedule.reserved?
                   (<div>
                     <Button 
                        name="nonReservedSubmit"
                        onclick={()=>this.Reserve(schedule)} 
                        className="btn btn-primary">
                          Choose {schedule.day} {schedule.slot}
                      </Button> 
                      <br/>
                      </div>)
                  : 
                  (<div><Button name="reservedSubmit" className="btn btn-danger">{schedule.day} {schedule.slot} reserved already!</Button><br/></div>)
                }</td>
               </tr>
              )
              return x
                })}
               
              
            </tbody>
          </Table>




           
        </div>

        <div>
            <h3>one more </h3>
        </div>
        </SwipeableViews>
            <Button onclick={(e)=>this.submit(e)}>Submit</Button>
          </Form>
        {/* </BindKeyboardSwipeableViews> */}
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
