import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input,Alert } from 'reactstrap';
import { login } from '../../../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Login extends Component {
    state={
        email:"",
        password:"",
        message:null

    }
    static propTypes = {
        isAuthenticated:PropTypes.bool,
        error:PropTypes.object.isRequired,
        login: PropTypes.func.isRequired
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
            const user = {
            email:this.state.email,
            password:this.state.password,
           }
        
        console.log('logging in')
        this.props.login(user) 
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
    { login }
  )(Login)
  
