import {
    GET_SCHEDULES,
    ADD_SCHEDULE,
    DELETE_SCHEDULE,
    SCHEDULE_LOADING
  } from '../actions/types'
  
  const initialState = {
    schedules: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_SCHEDULES:
        return {
          ...state,
          schedules: action.payload,
          loading: false
        };
      case DELETE_SCHEDULE:
        return {
          ...state,
          schedules: state.schedules.filter(schedule => schedule._id !== action.payload)
        };
      case ADD_SCHEDULE:
        return {
          ...state,
          schedule: [action.payload, ...state.schedules]
        };
      case SCHEDULE_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }