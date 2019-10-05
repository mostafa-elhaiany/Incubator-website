import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

// core components
import Header from "components/theme/Header/Header.js";
import Footer from "components/theme/Footer/Footer.js";
import GridContainer from "components/theme/Grid/GridContainer.js";
import GridItem from "components/theme/Grid/GridItem.js";
import Card from "components/theme/Card/Card.js";
import CardBody from "components/theme/Card/CardBody.js";
import Button from "components/theme/CustomButtons/Button.js";
import HeaderLinks from "components/theme/Header/HeaderLinks.js";
import Parallax from "components/theme/Parallax/Parallax.js";

import CommitteeCard from './Components/CommitteeCard'
import SessionsModal from './Components/SessionsModal'
import SessionCard from './Components/SessionCard'

import Axios from 'axios';

// import { connect } from 'react-redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// assets
import styles from "assets/jss/views/LoginPage/loginPage.js";

class Committees extends React.Component {
  state = {
    loaded: false,
    items: [],
    chosen: "",
    didChoose: false,
    sessions: [],
    sessionLoaded: false,
  }

  componentDidMount() {
    Axios.get('/api/committees')
      .then(res => this.setState({
        items: res.data.data,
        loaded: true
      }))
  }

  choose = (committee) => {
    this.setState({
      chosen: committee,
      didChoose: true
    })
  }

  getSession = () => {
    const id = this.state.chosen._id
    Axios.get(`/api/sessions/withCommittee/${id}`)
      .then(res => {
        this.setState({
          sessions: res.data.data,
          sessionLoaded: true
        })
      })
      .catch(err => console.log(err))
  }

  hideSessions = () => {
    this.setState({ sessionLoaded: false, didChoose: false })
  }

  render() {

    const { classes, ...rest } = this.props;
    if (this.state.didChoose) {
      this.getSession()
    }

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
                  <h1 className={classes.title2}>Committees</h1>
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
                    this.state.loaded ?
                      (
                        this.state.didChoose ?
                          (
                            <div className="container">
                              <h1>{this.state.chosen.name}</h1>
                              {
                                (this.props.isAuthenticated && (this.props.type === 'highboard' || this.props.type === 'admin')) &&
                                (<div>
                                  <SessionsModal committee={this.state.chosen.name} />
                                </div>)
                              }
                              {
                                this.state.sessionLoaded
                                  ?
                                  this.state.sessions.map(session => {
                                    return (
                                      <div className='jumbotron'>
                                        <SessionCard session={session} />
                                      </div>)
                                  })
                                  :
                                  <div>sessions loading please wait</div>
                              }
                              <Button color="rose" onClick={this.hideSessions}>
                                Back
                              </Button>
                            </div>
                          )
                          :
                          (
                            <div className="container">
                              {
                                this.state.items.map(item => {
                                  return (
                                    <div>
                                      <CommitteeCard choose={this.choose} item={item} />
                                    </div>
                                  )
                                })
                              }
                            </div>
                          )
                      )
                      :
                      (
                        <div>
                          <p>loading</p>
                        </div>
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

Committees.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  user: state.auth.user,
  type: state.auth.type
})

export default connect(mapStateToProps)(
  withStyles(styles)(Committees)
)
