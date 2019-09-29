import React, { Component } from 'react';
import { Label,InputGroup, InputGroupAddon,Container, ListGroup, ListGroupItem, Button,Input  } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers,deleteUser } from '../actions/userActions';

class UsersList extends Component {
    state={
        filtered:[],
        typed:false
    }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    getUsers: PropTypes.func.isRequired,
    delete:PropTypes.func.isRequired
  };

async componentDidMount() {
    await this.props.getUsers()
}

  onDeleteClick = id => {
      console.log('delete ',id)
  };
  search = (e)=>{
      this.setState({
          filtered:this.props.users.users.filter(user =>{
              return user.fullName.toLowerCase().includes(e.target.value.toLowerCase())
          })
      })
      this.setState({typed:true})
  }

  render() {
      var {users} = this.props.users
        if(this.state.typed){
            users= this.state.filtered
        }
      
    return (
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
                      onClick={this.onDeleteClick.bind(this, _id)}
                      >
                      &times;
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
  }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    users:state.users
});

export default connect(
  mapStateToProps,
  { getUsers,deleteUser }
)(UsersList);