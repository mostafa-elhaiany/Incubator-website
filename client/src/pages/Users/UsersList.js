import React, { Component } from 'react';
import { Spinner,Label,InputGroup, InputGroupAddon,Container, ListGroup, ListGroupItem, Button,Input  } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserProfile from './components/UsersProfile'
import Axios from 'axios';
class UsersList extends Component {
    state={
        filtered:[],
        typed:false,
        userSelected:false,
        users:[],
        loaded:false,
        userLoaded:false,
        selectedUser:null

    }

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

async componentDidMount() {
  Axios.get('/api/applicants')
  .then(res=>{
    this.setState({
    users:res.data.data,
    loaded:true
  })
})
.catch(err=>console.log(err))

}
choose = async id => {
  Axios.get(`/api/applicants/${id}`) 
  .then(res=>{
    this.setState({
      userSelected:true,
      userLoaded:true,
      selectedUser:res.data.data
  })
  })
      
  }
  search = (e)=>{
      this.setState({
          filtered:this.state.users.filter(user =>{
              return user.fullName.toLowerCase().includes(e.target.value.toLowerCase())
          })
      })
      this.setState({typed:true})
  }
empty =()=>{
  this.setState({
    userSelected:false,
  })
}

  render() {
      var users = this.state.users
        if(this.state.typed){
            users= this.state.filtered
        }
        console.log(users)
      
    return (
      
      this.state.userSelected?
      (
          <div>
             <UserProfile isAuthenticated={this.props.isAuthenticated} type={this.props.type} user={this.state.selectedUser} goBack={this.empty} />
          </div>
      )
      :
      (
          (!this.state.loaded)? (
              <div className="container">
                      loading please wait
                      <Spinner color="primary" />
              </div>
          )
          :
          (

              <div className='container'>
          <br/><br/>
          <InputGroup>
          <Label for="exampleEmail">Search By Name</Label>
          <br/>
      <InputGroupAddon addonType="prepend">@</InputGroupAddon>
      <Input placeholder="FullName" onInput={this.search}/>
    </InputGroup>
    <br />
      <Container>
      <ListGroup>
        <TransitionGroup className='users-list'>
          {users.map(({ _id, fullName,title,committee }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
              <ListGroupItem>
                {this.props.isAuthenticated ? (
                    <Button
                    className='remove-btn'
                    color='danger'
                    size='sm'
                    onClick={this.choose.bind(this, _id)}
                    >
                    &times;
                    show
                  </Button>
                  
                  ) : null}
                {fullName} {title} {committee}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  </div>
    )
  )
 
     )
}
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated, 
    type:state.auth.type  
});

export default connect(
  mapStateToProps,
  {}
)(UsersList);