import { combineReducers } from 'redux'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import userReducer from './userReducer'
import scheduleReducer from './scheduleReducer'
export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  users:userReducer,
  schedule:scheduleReducer
});