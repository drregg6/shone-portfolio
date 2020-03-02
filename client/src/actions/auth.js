import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  AUTH_ERROR,
  LOGIN_FAIL
} from './types';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';
import { setAlert } from './alert';

// Load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
}

// Login user
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  const body = JSON.stringify({email, password});
  console.log('Sending to database: ' + body);
  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
    dispatch(setAlert('Admin login. Welcome!', 'success'));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: LOGIN_FAIL });
  }
}

// Logout user
export const logout = () => dispatch => {
  dispatch(setAlert('Successfully logged out, bye!', 'danger'))
  dispatch({ type: LOGOUT_USER });
}