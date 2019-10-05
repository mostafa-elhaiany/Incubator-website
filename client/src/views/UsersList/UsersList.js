import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";

// core components
import Header from "components/theme/Header/Header.js";
import Footer from "components/theme/Footer/Footer.js";
import Button from "components/theme/CustomButtons/Button.js";
import GridContainer from "components/theme/Grid/GridContainer.js";
import GridItem from "components/theme/Grid/GridItem.js";
import Card from "components/theme/Card/Card.js";
import CardBody from "components/theme/Card/CardBody.js";
import HeaderLinks from "components/theme/Header/HeaderLinks.js";
import Parallax from "components/theme/Parallax/Parallax.js";

import { Spinner, Label, InputGroup, InputGroupAddon, Container, ListGroup, ListGroupItem, Input } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import UserProfile from './UsersProfile/UsersProfile'

import Axios from 'axios';

// import { connect } from 'react-redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// assets
import styles from "assets/jss/views/LoginPage/loginPage.js";

class UsersList extends React.Component {

  state = {
    filtered: [],
    typed: false,
    userSelected: false,
    users: [],
    loaded: false,
    userLoaded: false,
    selectedUser: null,
    config: {
      headers: {
        'Content-type': 'application/json',
        'x-auth-token':this.props.token
      }
    }

  }

  async componentDidMount() {
    Axios.get('/api/applicants')
      .then(res => {
        this.setState({
          users: res.data.data,
          loaded: true
        })
      })
      .catch(err => console.log(err))

  }
  choose = async id => {
    Axios.get(`/api/applicants/${id}`)
      .then(res => {
        this.setState({
          userSelected: true,
          userLoaded: true,
          selectedUser: res.data.data
        })
      })

  }
  search = (e) => {
    this.setState({
      filtered: this.state.users.filter(user => {
        return user.fullName.toLowerCase().includes(e.target.value.toLowerCase())
      })
    })
    this.setState({ typed: true })
  }
  upgrade = (id) => {
    Axios.put(`/api/highboards/accept/${id}`,this.state.config)
      .then(res => console.log(res.data.data))
      .catch(error => console.log(error.response.data))
  }
  reject = (id, feedback) => {
    const body = {
      feedBack:feedback
    }
    
    Axios.put(`/api/highboards/reject/${id}`, body,this.state.config)
      .then(res => console.log(res.data.data))
      .catch(error => console.log(error.response.data))
  }
  empty = () => {
    this.setState({
      userSelected: false,
    })
  }

  render() {

    var users = this.state.users
    if (this.state.typed) {
      users = this.state.filtered
    }
    const { classes, ...rest } = this.props;

    return (
      <div>
        <Header
          color="transparent"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 100,
            color: "white"
          }}
          {...rest}
        />
        <Parallax image={require("assets/img/sign.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <div className={classes.brand}>
                  <h1 className={classes.title2}>Users List</h1>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>

        <div className={classNames(classes.main2, classes.textCenter)}>
          <GridContainer justify="center">
            <GridItem className={classes.navWrapper}>
              <Card>
                <CardBody>

                  {
                    this.state.userSelected ?
                      <div>
                        <UserProfile upgrade={this.upgrade} reject={this.reject} isAuthenticated={this.props.isAuthenticated} type={this.props.type} user={this.state.selectedUser} goBack={this.empty} />
                      </div>
                      :
                      (
                        (!this.state.loaded)
                          ?
                          <div className="container">
                            loading please wait
                            <Spinner color="primary" />
                          </div>
                          :
                          (
                            <div className='container'>
                             <h1>
                               Search By Name
                             </h1>
                             
                              <InputGroup>
                                <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                                <Input placeholder="FullName" onInput={this.search} />
                              </InputGroup>
                              <br />
                              <Container>
                                <ListGroup>
                                  <TransitionGroup className='users-list'>
                                    {users.map(({ _id, fullName, title, committee }) => (
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
                  }

                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>

        <Footer />
      </div >
    );
  }
}

UsersList.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  user: state.auth.user,
  type: state.auth.type,
  token: state.auth.token
})

export default connect(mapStateToProps)(
  withStyles(styles)(UsersList)
)
