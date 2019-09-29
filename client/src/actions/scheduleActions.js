import axios from 'axios';
import { GET_SCHEDULES, ADD_SCHEDULE, DELETE_SCHEDULE, SCHEDULE_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getSchedules = () => dispatch => {
  dispatch(setSchedulesLoading());
  axios
    .get('/api/schedules')
    .then(res =>{
      dispatch({
        type: GET_SCHEDULES,
        payload: res.data.data
      })}
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addSchedule = schedule => (dispatch, getState) => {
  axios
    .post('/api/schedules', schedule, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_SCHEDULE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteSchedule = id => (dispatch, getState) => {
  axios
    .delete(`/api/schedules/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_SCHEDULE,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setSchedulesLoading = () => {
  return {
    type:   SCHEDULE_LOADING
  };
};