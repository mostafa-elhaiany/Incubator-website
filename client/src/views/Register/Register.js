import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// reactstrap
import {
  // Button,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Progress,
  Table,
  Alert
} from 'reactstrap'

import Axios from 'axios'
import SwipeableViews from 'react-swipeable-views'

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

// redux
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout, register } from 'actions/authActions'
import { clearErrors } from 'actions/errorActions';

// assets
import styles from "assets/jss/views/LoginPage/loginPage.js";
import image from "assets/img/bg7.jpg";

class Register extends React.Component {
  state = {
    committees: [],
    schedules: null,
    loaded: false,
    percentage: 0,
    email: null,
    name: null,
    password: null,
    Confirm: null,
    First: null,
    Second: null,
    why: null,
    day: null,
    slot: null,
    id: null,
    exp: null,
    hobbies: null,
    validEmail: "",
    validName: "",
    validPassword: "",
    validConfirm: "",
    validWhy: "",
    errorMsgConfirm: "",
    errorMsgEmail: "",
    errorMsgName: "",
    errorMsgPassword: "",
    errorMsgWhy: "",
    message: null,
    cardAnimation: "cardHidden",
    index: 0,
  }

  Input = async (e, schedule) => {
    if (e.target.name === 'email') {
      if (this.state.email === null)
        this.setState({ percentage: (this.state.percentage + 9) })
      this.setState({ email: e.target.value })
    }
    else if (e.target.name === 'name') {
      if (this.state.name === null)
        this.setState({ percentage: (this.state.percentage + 9) })
      this.setState({ name: e.target.value })
    }
    else if (e.target.name === 'password') {
      if (this.state.password === null)
        this.setState({ percentage: (this.state.percentage + 9) })
      this.setState({ password: e.target.value })
    }
    else if (e.target.name === 'Confirmpassword') {
      if (e.target.value === this.state.password) {
        if (this.state.Confirm === null)
          this.setState({ percentage: (this.state.percentage + 9) })
        this.setState({ Confirm: e.target.value })
      }
      else
        console.log('passwords must match')
    }
    else if (e.target.name === 'selectFirst') {
      if (this.state.First === null)
        this.setState({ percentage: (this.state.percentage + 9) })
      this.setState({ First: e.target.value })

      Axios.get(`/api/schedules/withType/${e.target.value}`)
        .then(res => {
          console.log('res ', res.data.data)
          this.setState({
            schedules: res.data.data
          })
        })

    }
    else if (e.target.name === 'selectSecond') {
      if (this.state.Second === null)
        this.setState({ percentage: (this.state.percentage + 9) })
      this.setState({ Second: e.target.value })
    }
    else if (e.target.name === 'text') {
      if (this.state.why === null)
        this.setState({ percentage: (this.state.percentage + 10) })
      this.setState({ why: e.target.value })
    }
    else if (e.target.name === 'id') {
      if (this.state.id === null)
        this.setState({ percentage: (this.state.percentage + 9) })
      this.setState({ id: e.target.value })
    }
    else if (e.target.name === 'reserve') {
      if (this.state.slot === null)
        this.setState({ percentage: (this.state.percentage + 9) })
      this.setState({
        slot: schedule.slot,
        day: schedule.day
      })
    }
    else if (e.target.name == 'exp') {
      if (this.state.exp === null)
        this.setState({ percentage: (this.state.percentage + 8) })
      this.setState({
        exp: e.target.value
      })
    }
    else if (e.target.name == 'hobbies') {
      if (this.state.hobbies === null)
        this.setState({ percentage: (this.state.percentage + 8) })
      this.setState({
        hobbies: e.target.value
      })
    }
  }

  submit = (e) => {
    e.preventDefault()
    this.setState({ percentage: 100 })
    console.log(this.state)
    const newApplcant = {
      email: this.state.email,
      fullName: this.state.name,
      password: this.state.password,
      firstPrefrence: this.state.First,
      secondPrefrence: this.state.Second,
      why: this.state.why,
      hobbies: this.state.hobbies,
      exp: this.state.exp,
      reservation: {
        day: this.state.day,
        slot: this.state.slot
      },
      GUC_ID: this.state.id
    }

    this.props.register(newApplcant)
  }

  handleChangeIndex = index => {
    this.setState({
      index,
    });
  };

  handleTabChange = (event, value) => {
    this.setState({
      index: value,
    });
  };

  handleButtonChange = index => {
    this.setState({
      index: index,
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ cardAnimation: "" })
    }, 700);

    Axios.get('/api/committees')
      .then(res => this.setState({
        committees: res.data.data,
        loaded: true
      }))
      .catch(err => console.log(err.respone.data))
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props

    if (error !== prevProps.error) {
      if (error.id === 'REGISTER_FAIL') {
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
      alert('you are now registered see you on your interview slot :D')
      this.props.history.push(`/`)
    }
  }

  render() {
    const { classes, ...rest } = this.props;
    const form = (
      <div >
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="test@mail.com" onInput={(e) => this.Input(e)}
            valid={this.state.validEmail === 'safe'}
            invalid={this.state.validEmail === 'danger'}
          />
          <FormFeedback valid>
            All good!
          </FormFeedback>
          <FormFeedback>
            {`Uh Oh! ${this.state.errorMsgEmail}`}
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="exampleName">FullName</Label>
          <Input type="name" name="name" id="exampleName" placeholder="jane doe" onInput={(e) => this.Input(e)}
            valid={this.state.validName === 'safe'}
            invalid={this.state.validName === 'danger'}
          />
          <FormFeedback valid>
            All good!
         </FormFeedback>
          <FormFeedback>
            {`Uh Oh! ${this.state.errorMsgName}`}
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="exampleName">GUC ID</Label>
          <Input type="id" name="id" id="exampleid" placeholder="xx-xxxx" onInput={(e) => this.Input(e)}
            valid={this.state.validName === 'safe'}
            invalid={this.state.validName === 'danger'}
          />
          <FormFeedback valid>
            All good!
         </FormFeedback>
          <FormFeedback>
            {`Uh Oh! ${this.state.errorMsgName}`}
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" onInput={(e) => this.Input(e)}
            valid={this.state.validPassword === 'safe'}
            invalid={this.state.validPassword === 'danger'}
          />
          <FormFeedback valid>
            All good!
          </FormFeedback>
          <FormFeedback>
            {`Uh Oh! ${this.state.errorMsgPassword}`}
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Confirm Password</Label>
          <Input type="password" name="Confirmpassword" id="exampleConfirmPassword" placeholder="password placeholder" onInput={(e) => this.Input(e)}
            valid={this.state.validConfirm === 'safe'}
            invalid={this.state.validConfirm === 'danger'}
          />
          <FormFeedback valid>
            All good!
          </FormFeedback>
          <FormFeedback>
            {`Uh Oh! ${this.state.errorMsgConfirm}`}
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelectFirst">First prefrence</Label>
          <Input type="select" name="selectFirst" id="exampleSelectFirst" onInput={(e) => this.Input(e)}>
            <option>Choose first prefrence</option>
            {this.state.committees.map(committee => <option>{committee.name}</option>)}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelectSecond">Second prefrence</Label>
          <Input type="select" name="selectSecond" id="exampleSelectSecond" onInput={(e) => this.Input(e)}>
            <option>Choose second prefrence</option>
            {this.state.committees.map(committee => <option>{committee.name}</option>)}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">Why did you apply to this committee?</Label>
          <Input type="textarea" name="text" id="exampleText" onInput={(e) => this.Input(e)}
            valid={this.state.validWhy === 'safe'}
            invalid={this.state.validWhy === 'danger'}
          />
          <FormFeedback valid>
            All good!
          </FormFeedback>
          <FormFeedback>
            {`Uh Oh! ${this.state.errorMsgWhy}`}
          </FormFeedback>
        </FormGroup>
      </div>
    );
    const backgroundInfo = (
      <div >
        <FormGroup>
          <Label for="experience">previous Experience</Label>
          <Input type="text" name="exp" id="exampleexp" placeholder="type NA if there's none" onInput={(e) => this.Input(e)} />
        </FormGroup>
        <FormGroup>
          <Label for="hobbies">Hobbies</Label>
          <Input type="text" name="hobbies" id="hobbies" placeholder="any hobbies you have seperated by commas" onInput={(e) => this.Input(e)} />
        </FormGroup>
      </div>
    );
    const table = this.state.schedules === null ?
      (
        <div>
          <h4>please choose a first preference first</h4>
        </div>
      )
      :
      (
        <div >
          <h3>Choose  a reservation slot</h3>

          <Table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Slot</th>
                <th>Reserve</th>
              </tr>
            </thead>
            <tbody>
              {this.state.schedules.map(schedule => {
                const x = (
                  <tr>
                    <td>{schedule.day}</td>
                    <td>{schedule.slot}</td>
                    <td>{
                      !schedule.reserved ?
                        (<div>
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="reserve" onInput={(e) => this.Input(e, schedule)} />{' '}
                              Choose {schedule.day} {schedule.slot}
                            </Label>
                          </FormGroup>
                          <br />
                        </div>)
                        :
                        (<div><FormGroup check disabled>
                          <Label check>
                            <Input type="radio" name="radio1" disabled />{' '}
                            {schedule.day} {schedule.slot} reserved already!
                        </Label>
                        </FormGroup>
                        </div>)
                    }</td>
                  </tr>
                )
                return x
              })}

            </tbody>
          </Table>
        </div>
      );

    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="Incubator"
          rightLinks={
            <HeaderLinks
              isAuthenticated={this.props.isAuthenticated}
              logout={this.props.logout}
            />}
          changeColorOnScroll={{
            height: 100,
            color: "white"
          }}
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
              <GridItem >
                <Card className={classes[this.state.cardAnimation]}>
                  <form className={classes.form} onSubmit={this.submit}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h1 className={classes.title}>Register</h1>
                      <br />
                      <h3 className={classes.title}>And apply to Incubator</h3>
                      <div>
                        {
                          (this.state.percentage === 0 ?
                            <Progress />
                            :
                            <Progress color="success" value={this.state.percentage} />)
                        }
                        <h6>PROGRESS {this.state.percentage}%</h6>
                      </div>
                    </CardHeader>

                    <CardBody>
                      {
                        this.state.message ?
                          <Alert color="danger">
                            {this.state.message}
                          </Alert>
                          :
                          <div></div>
                      }
                      <Tabs value={this.state.index} fullWidth onChange={this.handleTabChange} style={styles.tabs}>
                        <Tab label="General Info" />
                        <Tab label="Interview Slot" />
                        <Tab label="Background Info" />
                      </Tabs>
                      <SwipeableViews containerStyle={styles.slideContainer} index={this.state.index} onChangeIndex={this.handleChangeIndex}>
                        {
                          form
                        }
                        {
                          table
                        }
                        {
                          backgroundInfo
                        }
                      </SwipeableViews>


                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button color="rose" size="lg" onClick={() => this.handleButtonChange(this.state.index === 0 ? 1 : 0)}>
                        {
                          this.state.index === 0 ?
                            "Just one more step"
                            :
                            "Back to General Info"
                        }
                        <i className={this.state.index === 0 ? "fas fa-arrow-right" : "fas fa-arrow-left"} />
                      </Button>
                      <Button type='submit' color="primary" size="lg">
                        Register
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

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  auth: state.auth
})

export default withStyles(styles)(
  connect(mapStateToProps, { register, logout, clearErrors })(Register)
)
