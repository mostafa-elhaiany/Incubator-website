import {
    GET_USERS,
    GET_USER,
    DELETE_USER,
    USERS_LOADING
  } from '../actions/types';
  
  const initialState = {
    users: [],
    user:{},
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_USERS:
        return {
          ...state,
          users: action.payload,
          loading: false,
          user:{}
        };
      case DELETE_USER:
        return {
          ...state,
          users: state.users.filter(user => user._id !== action.payload)
        };
      case USERS_LOADING:
        return {
          ...state,
          loading: true
        };
        case GET_USER:
            return {
              ...state,
              user:action.payload,
              loading: false
            };
      default:
        return state;
    }
  }