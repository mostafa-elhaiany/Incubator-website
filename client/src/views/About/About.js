import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

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

import Fade from 'react-reveal/Fade';
import Axios from 'axios';

// import { connect } from 'react-redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// assets
import styles from "assets/jss/views/LoginPage/loginPage.js";

class About extends React.Component {
  state = {
    loaded: false,
    committees: []
  }

  componentDidMount() {
    Axios.get('/api/committees/')
      .then(res => this.setState({ committees: res.data.data, loaded: true }))
      .catch(err => console.log(err))
  }

  render() {

    const { classes, ...rest } = this.props;

    return (
      <div>
        <Header
          color="transparent"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 200,
            color: "white"
          }}
          {...rest}
        />
        <Parallax image={require("assets/img/sign.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <div className={classes.brand}>
                  <h1 className={classes.title2}>About us</h1>
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
                  <Fade bottom>
                    <div>
                      <h1>Our Mission</h1>
                      <Fade left opposite cascade>
                        <h5>
                          Incubator is a scientific club that aims to remove the gap between students from deffirent majors and backgrounds
                          by making them work together as a team on one of our various project in order to make them able to work with
                          people from deffirent majors thus making there future work life much easier.
                    </h5>
                      </Fade>
                    </div>
                  </Fade>

                  <Fade bottom>
                    <div>
                      <h1>Our board</h1>
                      <Fade left opposite cascade>
                        <img src='https://res.cloudinary.com/dexmoiznt/image/upload/v1569768424/tree_pugrul' title="Our board" alt="Our board" style={{
                          justifyContent: 'center',
                          alignItems: 'center', height: '600px', width: '1200px;'
                        }}>
                        </img>
                      </Fade>

                    </div>
                  </Fade>

                  <Fade bottom>
                    <div>
                      <h1>Follow us to never miss an update!</h1>
                      <Fade left opposite cascade>
                        <Tooltip
                          id="instagram-facebook"
                          title="Follow us on facebook"
                          placement={window.innerWidth > 959 ? "top" : "left"}
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <Button
                            round
                            color="primary"
                            size="lg"
                            href="https://www.facebook.com/pg/IncubatorGUC"
                          >
                            <i className={classes.socialIcons + " fab fa-facebook"} />
                          </Button>
                        </Tooltip>

                        <Tooltip
                          id="instagram-tooltip"
                          title="Follow us on instagram"
                          placement={window.innerWidth > 959 ? "top" : "left"}
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <Button
                            round
                            color="primary"
                            size="lg"
                            href="https://www.instagram.com/incubator_guc/"
                          >
                            <i className={classes.socialIcons + " fab fa-instagram"} />
                          </Button>
                        </Tooltip>

                      </Fade>
                    </div>
                  </Fade>

                  <Fade bottom>
                    <div>
                      <h1>Our comittes</h1>
                      <br />
                      <Fade left opposite cascade>
                        <div>
                          <h3>Organizing</h3>
                          {this.state.committees.map(
                            committee => {
                              if (committee.type === 'Organizing')
                                return <h5>{committee.name}</h5>
                              return
                            }
                          )}
                        </div>
                      </Fade>
                      <Fade left opposite cascade>
                        <div>
                          <h3>Projects</h3>
                          {this.state.committees.map(
                            committee => {
                              if (committee.type === 'projects')
                                return <h5>{committee.name}</h5>
                              return
                            }
                          )}
                        </div>
                      </Fade>
                    </div>
                  </Fade>
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

About.propTypes = {
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
  withStyles(styles)(About)
)
