import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input,Alert } from 'reactstrap';
import { applicantLogin } from '../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Login extends Component {
    state={
        email:"",
        password:"",
        type:"User",
        message:null

    }
    static propTypes = {
        isAuthenticated:PropTypes.bool,
        error:PropTypes.object.isRequired,
        register: PropTypes.func.isRequired
      }
    

    selectUser = (e)=>{
        this.setState({type:e.target.value})
    }
    
    inputEmail = (e)=>{
        this.setState({email:e.target.value})
    }
    
    inputPassword = (e)=>{
        this.setState({password:e.target.value})
    }

    submit = (e)=>{
        e.preventDefault()
        //console.log(this.state)
            const appilcant = {
            email:this.state.email,
            password:this.state.password,
           }
        
        this.props.applicantLogin(appilcant) 
    }
    componentDidUpdate(prevProps){
        const {error}= this.props
    
        if(error !== prevProps.error){
            if(error.id==='LOGIN_FAIL'){
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
          this.props.history.push(`/profile/`)
        }
      }
      

    render () {
    return (
        <div>
            <h1>Login here</h1>
            { 
                this.state.message ?
                <Alert color="danger">
                    {this.state.message}
                </Alert>
                :
                <div></div>
            }
                <Form onSubmit={(e)=>this.submit(e)}>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="test@mail.com" onInput={(e)=>this.inputEmail(e)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" onInput={(e)=>this.inputPassword(e)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelect">Login type</Label>
                        <Input type="select" name="select" id="exampleSelect" onClick={(e)=>this.selectUser(e)}>
                            <option>User</option>
                            <option>Admin</option>
                        </Input>
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
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
    { applicantLogin }
  )(Login)
  
