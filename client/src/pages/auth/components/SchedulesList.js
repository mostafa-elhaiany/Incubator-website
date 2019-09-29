import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSchedules, deleteSchedule } from '../../../actions/scheduleActions'
import PropTypes from 'prop-types';
import {
    FormGroup,
    Label,
    Input,
    Table} from 'reactstrap'
class SchedulesList extends Component {
  static propTypes = {
    getSchedules: PropTypes.func.isRequired,
    schedule: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,

  };

  
  componentDidMount() {
    this.props.getSchedules();
  }

  onDeleteClick = id => {
    this.props.deleteSchedule(id);
  };

  render() {
    return (
        <Table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Slot</th>
            <th>Reserve</th>
          </tr>
        </thead>
        <tbody>
          {this.props.schedule.schedules.map(schedule =>{
          const x= (
            <tr>
            <td>{schedule.day}</td>
            <td>{schedule.slot}</td>
            <td>{
              !schedule.reserved?
               (<div>
                  <FormGroup check>
                  <Label check>
                  <Input type="radio" name="reserve" onInput={(e)=>this.Input(e,schedule)} />{' '}
                  Choose {schedule.day} {schedule.slot}
                  </Label>
                </FormGroup>
                  <br/>
                  </div>)
              : 
              (<div><FormGroup check disabled>
                    <Label check>
                      <Input type="radio" name="radio1" disabled />{' '}
                      {schedule.day} {schedule.slot} reserved by {schedule.interviewee}
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
    )
  }
}

const mapStateToProps = state => ({
  schedule: state.schedule,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getSchedules, deleteSchedule }
)(SchedulesList);