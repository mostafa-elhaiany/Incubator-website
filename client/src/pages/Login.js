import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Login extends Component {
    selectUser = (e)=>{
        console.log(e.target.value)
    }
    
    inputEmail = (e)=>{
        console.log(e.target.value)
    }
    
    inputPassword = (e)=>{
        console.log(e.target.value)
    }
    render () {
    return (
        <div>
            <h1>Login here</h1>
                <Form>
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

export default Login
