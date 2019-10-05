import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

// core components
import Header from "components/theme/Header/Header.js";
import Footer from "components/theme/Footer/Footer.js";
import GridContainer from "components/theme/Grid/GridContainer.js";
import GridItem from "components/theme/Grid/GridItem.js";
import Button from "components/theme/CustomButtons/Button.js";
import HeaderLinks from "components/theme/Header/HeaderLinks.js";
import Parallax from "components/theme/Parallax/Parallax.js";

//redux 
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from 'actions/authActions'

import styles from "assets/jss/views/LandingPage/landingPage";

// Sections for this page
import ProjectsSection from "./Sections/ProjectsSection";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";
import OrganizingSection from "./Sections/OrganizingSection";

// const useStyles = makeStyles(styles);
// const classes = useStyles();

class LandingPage extends React.Component {
  render() {

    const dashboardRoutes = [];
    const { classes, ...rest } = this.props;

    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          rightLinks={
            <HeaderLinks
              isAuthenticated={this.props.isAuthenticated}
              logout={this.props.logout}
            />
          }
          fixed
          changeColorOnScroll={{
            height: 100,
            color: "white"
          }}
          {...rest}
        />
        <Parallax filter image={require("../../assets/img/landing-bg.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Incubator</h1>
                <h2> So much yet to be discovered </h2>
                <h4>
                  Enriching students’ knowledge by creating the opportunity for them to participate in projects integrated between different majors.
                  We aim to prepare every student to be future a inventor and researcher.
                  As the starnova lightens the sky by creating stars we aim to lighten the world by their discoveries.
                </h4>
                <br />
                <Button
                  color="danger"
                  size="lg"
                  href="https://www.youtube.com/watch?v=fNbrxX5fSOk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-play" />
                  Watch video
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <ProjectsSection />
            <OrganizingSection/>
            <TeamSection />
            <WorkSection />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

LandingPage.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  auth: state.auth
})

export default withStyles(styles)(
  connect(mapStateToProps, { logout })(LandingPage)
)
