import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { addSchedule } from '../../../actions/scheduleActions';
import PropTypes from 'prop-types';

class ScheduleModal extends Component {
  state = {
    modal: false,
    slot: '',
    day:'',
    interviewer:'',
    committee:'',
    message: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    addSchedule: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();

    const newSchedule = {
      day: this.state.day,
      slot: this.state.slot,
      interviewer: this.state.interviewer,
      committee: this.state.committee
    };

    // Add item via addItem action
    await this.props.addSchedule(newSchedule)

      // Close modal
      this.toggle();
  };

  

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color='dark'
            style={{ marginBottom: '2rem' }}
            onClick={this.toggle}
          >
            Add Interview slot
          </Button>
        ) : (
          <h4 className='mb-3 ml-4'>Please log in to manage Schedules</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Schedules List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              
              <FormGroup>
              <FormGroup>
                    <Label for="exampleSelectDay">Day</Label>
                    <Input type="select" name="day"  onChange={this.onChange}>
                        <option>Select Day</option>
                        <option>Saturday</option>
                        <option>Sunday</option>
                        <option>Monday</option>
                        <option>Tuesday</option>
                        <option>wednesday</option>
                        <option>Thursday</option>
                    </Input>
                </FormGroup>
                <Label for='item'>slot</Label>
                <Input
                  type='select'
                  name='slot'
                  placeholder='Add Schedule day'
                  onChange={this.onChange}
                >
                <option>Select Slot</option>
                <option>8:30 -> 9:00</option>
                <option>9:15 -> 9:45</option>
                <option>9:45 -> 10:00</option>
                <option>10:00 -> 10:30</option>
                <option>10:45 -> 11:15</option>
                <option>11:30 -> 12:00</option>
                <option>12:15 -> 12:45</option>
                <option>1:00 -> 1:30</option>
                <option>1:30 -> 1:45</option>
                <option>1:15 -> 1:45</option>
                <option>1:45 -> 2:15</option>
                <option>2:30 -> 3:00</option>
                <option>3:15 -> 3:45</option>
                <option>4:00 -> 4:30</option>
                <option>4:45 -> 5:15</option>
                <option>5:45 -> 6:15</option>
                </Input>
              </FormGroup>
              <FormGroup>
                    <Label >Committee</Label>
                    <Input type="select" name="committee"  onChange={this.onChange}>
                      <option>Select Committee</option>
                        <option>Affective Computing</option>
                        <option>Smart problem solvers</option>
                        <option>BioInformatics</option>
                        <option>Lab on chip</option>
                        <option>Fundraising</option>
                        <option>Events</option>
                        <option>Marketing</option>
                        <option>for Projects</option>
                        <option>for Organizing</option>
                    </Input>
                </FormGroup>
              <FormGroup>
                <Label for='item'>interviewer</Label>
                <Input
                  type='text'
                  name='interviewer'
                  placeholder='Add interview slot'
                  onChange={this.onChange}
                />
              </FormGroup>
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Add Schedule
                </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  schedule: state.schedule,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { addSchedule }
)(ScheduleModal);