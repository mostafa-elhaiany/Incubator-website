import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Email from "@material-ui/icons/Email";

// core components
import Header from "components/theme/Header/Header.js";
import HeaderLinks from "components/theme/Header/HeaderLinks.js";
import Footer from "components/theme/Footer/Footer.js";
import GridContainer from "components/theme/Grid/GridContainer.js";
import GridItem from "components/theme/Grid/GridItem.js";
import Button from "components/theme/CustomButtons/Button.js";
import Card from "components/theme/Card/Card.js";
import CardBody from "components/theme/Card/CardBody.js";
import CardHeader from "components/theme/Card/CardHeader.js";
import CardFooter from "components/theme/Card/CardFooter.js";
import CustomInput from "components/theme/CustomInput/CustomInput.js";

import { Alert } from 'reactstrap';

// redux
import { login } from 'actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from "assets/jss/views/LoginPage/loginPage.js";

import image from "assets/img/bg7.jpg";


class Login extends React.Component {

  state = {
    email: "",
    password: "",
    message: null,
    cardAnimation: "cardHidden",
  }

  inputEmail = (e) => {
    this.setState({ email: e.target.value })
  }

  inputPassword = (e) => {
    this.setState({ password: e.target.value })
  }

  submit = (e) => {
    e.preventDefault()
    //console.log(this.state)
    const user = {
      email: this.state.email,
      password: this.state.password,
    }

    console.log('logging in', user)
    this.props.login(user)
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ cardAnimation: "" })
    }, 700);
  }

  componentDidUpdate(prevProps) {
    console.log("update")
    const { error } = this.props

    if (error !== prevProps.error) {
      if (error.id === 'LOGIN_FAIL') {
        if (error.msg.message)
          this.setState({ message: error.msg.message })
        else if (error.msg.msg)
          this.setState({ message: error.msg.msg })
      }
      else {
        this.setState({ message: null })
      }
    }
    if (this.props.isAuthenticated) {
      this.props.history.push(`/profile/`)
    }
  }

  render() {

    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="Incubator"
          rightLinks={<HeaderLinks />}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              {
                this.state.message &&
                <Alert color="danger">
                  {this.state.message}
                </Alert>
              }
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimation]}>
                  <form className={classes.form} onSubmit={(e) => this.submit(e)}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h2 className={classes.title}>Login</h2>
                    </CardHeader>

                    <CardBody>
                      <CustomInput
                        labelText="Email..."
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: (e) => this.inputEmail(e),
                          type: "email",
                          name: "email",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Password"
                        id="pass"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: (e) => this.inputPassword(e),
                          type: "password",
                          name: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          ),
                          autoComplete: "off"
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button type="submit" color="primary" size="lg">
                        Get started
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default withStyles(styles)(
  connect(mapStateToProps, { login })(Login)
)
