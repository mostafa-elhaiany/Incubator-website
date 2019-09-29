import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSchedules, deleteSchedule } from '../../../actions/scheduleActions'
import PropTypes from 'prop-types';
import {
    FormGroup,
    Label,
    Input,
    Table} from 'reactstrap'
import { Button } from '@material-ui/core';
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
            <th>Reservation</th>
            <th>interviewer</th>
          </tr>
        </thead>
        <tbody>
          {this.props.schedule.schedules.map(schedule =>{
          const x= (
            <tr>
            <td>{schedule.day}</td>
            <td>{schedule.slot}</td>
            <td>{
              schedule.reserved?
              (
               <p>reserved by {schedule.interviewee}</p>
              )
              : 
              (
                <p>free</p>
              )
            }</td>
             <td>{schedule.interviewer}</td>
             <td><Button className="btn btn-danger" onClick={()=>this.onDeleteClick(schedule._id)}>Delete</Button></td>
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