import React, { Component } from 'react';
import { Spinner,Label,InputGroup, InputGroupAddon,Container, ListGroup, ListGroupItem, Button,Input  } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers,getUser } from '../../actions/userActions';
import UserProfile from './components/UsersProfile'
class UsersList extends Component {
    state={
        filtered:[],
        typed:false,
        userSelected:false
    }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    getUsers: PropTypes.func.isRequired,
    getUser:PropTypes.func.isRequired,
    user:PropTypes.object
  };

async componentDidMount() {
    await this.props.getUsers()
}
choose = async id => {
    await this.props.getUser(id) 
      this.setState({
          userSelected:true
      })
  }
  search = (e)=>{
      this.setState({
          filtered:this.props.users.users.filter(user =>{
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
      var {users} = this.props.users
        if(this.state.typed){
            users= this.state.filtered
        }
      
    return (
        this.state.userSelected?
        (
            <div>
               <UserProfile isAuthenticated={this.props.isAuthenticated} user={this.props.user} goBack={this.empty} />
            </div>
        )
        :
        (
            this.props.usersLoading? (
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
    users:state.users,
    usersLoading:state.users.loading,
    user:state.users.user
    
});

export default connect(
  mapStateToProps,
  { getUsers,getUser }
)(UsersList);