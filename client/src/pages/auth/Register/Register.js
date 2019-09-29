import React, { Component } from 'react'
import { Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Spinner,
  Progress,
  Table,
  Alert} from 'reactstrap'
import Axios from 'axios'
import SwipeableViews from 'react-swipeable-views'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../../actions/authActions';
import { clearErrors } from '../../../actions/errorActions';

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
      id:"",
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
      message:null
  }
  static propTypes = {
    isAuthenticated:PropTypes.bool,
    error:PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  Input = async (e,schedule)=>{
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
    else if(e.target.name==='id'){
      this.setState({id:e.target.value})
    }
    else if(e.target.name==='reserve'){
      await this.setState({
        slot:schedule.slot,
        day:schedule.day
      })
    }
  }
 
  submit = (e)=>{
    e.preventDefault()
    console.log(this.state)
      const newApplcant = {
        email:this.state.email,
        fullName:this.state.name,
        password:this.state.password,
        firstPrefrence:this.state.First,
        secondPrefrence:this.state.Second,
        why:this.state.why,
        reservation:{
          day:this.state.day,
          slot:this.state.slot
    },
    GUC_ID:this.state.id
  }
  
  this.props.register(newApplcant) 
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
  
  componentDidUpdate(prevProps){
    const {error}= this.props

    if(error !== prevProps.error){
        if(error.id==='REGISTER_FAIL'){
          if(error.msg.message)
              this.setState({message:error.msg.message})
          else if(error.msg.msg)
            this.setState({message:error.msg.msg})    
        }
        else{
          this.setState({message:null})
        }
    }
    if(this.props.isAuthenticated){
      alert('you are now registered see you on your interview slot :D')
      this.props.history.push(`/`)
    }
  }
  
    render () {
    return this.state.loaded ?
    (
        <div>
            <div className="text-center">progress {this.state.percentage}%</div>
           
           {(this.state.percentage===0?
                <Progress/>
            :
            <Progress color="success" value={this.state.percentage} />)}
           
        <h1>Registeration</h1>
        { 
          this.state.message ?
         <Alert color="danger">
            {this.state.message}
         </Alert>
         :
         <div></div>
        }
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
          <Label for="exampleName">GUC ID</Label>
          <Input type="id" name="id" id="exampleid" placeholder="xx-xxxx" onInput={(e)=>this.Input(e)}
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
          <option>Choose first prefrence</option>
            {this.state.committees.map(committee=><option>{committee.name}</option>)}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelectSecond">Second prefrence</Label>
          <Input type="select" name="selectSecond" id="exampleSelectSecond" onInput={(e)=>this.Input(e)}>
           <option>Choose second prefrence</option>
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
                      <FormGroup check>
                      <Label check>
                      <Input type="radio" name="reserve" onInput={(e)=>this.Input(e,schedule)} />{' '}
                      Choose {schedule.day} {schedule.slot}
                      </Label>
                    </FormGroup>
                      <br/>
                      </div>)
                  : 
                  (<div><FormGroup check disabled>
                        <Label check>
                          <Input type="radio" name="radio1" disabled />{' '}
                          {schedule.day} {schedule.slot} reserved already!
                        </Label>
                      </FormGroup>
                  </div>)
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
const mapStateToProps = state =>({
  isAuthenticated:state.auth.isAuthenticated,
  error:state.error
})


export default connect(
  mapStateToProps,
  { register, clearErrors }
)(Register)
