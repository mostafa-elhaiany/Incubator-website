import axios from 'axios';
import { GET_USERS, DELETE_USER, USERS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getType = (id)=>{
    axios.get(`/api/auth/userType/${id}`)
    .then(res=>{
        if(res.data.error){
            return 'error'
        }
        return res.data.data
    }
        )
}


export const getUsers = () => dispatch => {
  dispatch(setUsersLoading());
  var allUsers=[]
  axios
    .get('/api/applicants')
    .then(res =>{
          allUsers=allUsers.concat(res.data.data)
          axios.get('/api/members')
          .then(res =>{
                allUsers=allUsers.concat(res.data.data)
                axios.get('/api/highboards')
                .then(res =>{
                        allUsers=allUsers.concat(res.data.data)
                        dispatch({
                            type: GET_USERS,
                            payload: allUsers
                          })
              
                })
        })
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};


export const deleteUser = id => (dispatch, getState) => {
  
  const type = getType(id)
  var route=''
  if(type!=='error'){
    switch(type){
        case 'applicant':  route=`/api/applicants/${id}`
        break
        case 'member':  route=`/api/members/${id}`
        break
        case 'highboard':  route=`/api/highboards/${id}`
        break;
        case 'admin':  route=`/api/admins/${id}`
        break;
        default:
    }

    axios
      .delete(route, tokenConfig(getState))
      .then(res =>
        dispatch({
            type: DELETE_USER,
            payload: id
        })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
            );
        }else {
          dispatch(returnErrors('type error','error'))
        }
}

export const setUsersLoading = () => {
  return {
    type: USERS_LOADING
  };
};