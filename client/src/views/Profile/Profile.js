import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Done from "@material-ui/icons/Done";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/theme/Header/Header.js";
import Footer from "components/theme/Footer/Footer.js";
import Button from "components/theme/CustomButtons/Button.js";
import GridContainer from "components/theme/Grid/GridContainer.js";
import GridItem from "components/theme/Grid/GridItem.js";
import HeaderLinks from "components/theme/Header/HeaderLinks.js";
import NavPills from "components/theme/NavPills/NavPills.js";
import Parallax from "components/theme/Parallax/Parallax.js";

import profile from "assets/img/no-profile-picture.png";

// import { connect } from 'react-redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import styles from "assets/jss/views/ProfilePage/profilePage.js";
import ChangePassword from "./components/ChangePassword";

const useStyles = makeStyles(styles);

function Profile(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  const applicant = props.type==='applicant'? (
                 <div>
                  <p>your application here, if you already did your interview you'll see whether or not you're rejected along with your feedback
                    however if you're accepted you'll find yourself logging in as a member
                  </p>
                  <p> rejected: {props.user.rejected}</p>
                  <p>feedback: {props.user.feedBack}</p>
                  </div>
    ):(<p>you're not an applicant with application so nothing to view here :D</p>) 

  return (
    <div>
      <Header
        color="transparent"
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img
                      src={profile}
                      alt="profile pic" className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{props.user.fullName}</h3>
                    <h6>{props.type}</h6>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            {/* <div className={classes.description}>
              <p>
                An artist of considerable range, Chet Faker — the name taken by
                Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                and records all of his own music, giving it a warm, intimate
                feel with a solid groove structure.{" "}
              </p>
            </div> */}
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "My Information",
                      tabIcon: Face,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <div className={classes.description}>
                                <p>NAME:{props.user.fullName}</p>
                                <p>email:{props.user.email}</p>
                                <ChangePassword type={props.type} id={props.user._id} config={{headers:{'Content-type': 'application/json','x-auth-token':props.token}}} />
                            </div>
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "??",
                      tabIcon: Favorite,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <p>more features will be comming soon :D</p>
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "Application progress",
                      tabIcon: Done,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            {applicant}
                          </GridItem>
                        </GridContainer>
                      )
                    }
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
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

export default connect(mapStateToProps)(Profile)
