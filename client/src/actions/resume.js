import {
  GET_RESUME,
  UPDATE_RESUME,
  DELETE_EXPERIENCE,
  DELETE_EMPLOYMENT,
  DELETE_EDUCATION
} from './types';

import axios from 'axios';
import { setAlert } from './alert';

// Get the first resume
export const fetchResume = () => async dispatch => {
  try {
    const res = await axios.get('/api/resumes');
    dispatch({
      type: GET_RESUME,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
}

// Create or update a resume
export const createResume = (formData, history, edit=false) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post('/api/resumes', formData, config);
    dispatch({
      type: UPDATE_RESUME,
      payload: res.data
    });
    dispatch(setAlert((!edit ? 'Resume created!' : 'Resume edited!'), 'success'));

    history.push('/');
  } catch (err) {
    console.error(err);
  }
}

// Create Employment
export const createEmployment = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.put('/api/resumes/employment', formData, config);
    dispatch({
      type: UPDATE_RESUME,
      payload: res.data
    });

    dispatch(setAlert('Employment created!', 'success'));
    history.push('/');
  } catch (err) {
    console.error(err);
  }
}
// Delete Employment
export const deleteEmployment = (id) => async dispatch => {
  try {
    await axios.delete(`api/resumes/employment/${id}`);
    dispatch({
      type: DELETE_EMPLOYMENT,
      payload: id
    });
    dispatch(setAlert('Employment deleted!', 'danger'));
  } catch (err) {
    console.error(err);
  }
}


// Create Education
export const createEducation = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.put('/api/resumes/education', formData, config);
    dispatch({
      type: UPDATE_RESUME,
      payload: res.data
    });

    dispatch(setAlert('Education created!', 'success'));
    history.push('/');
  } catch (err) {
    console.error(err);
  }
}
// Delete Education
export const deleteEducation = (id) => async dispatch => {
  try {
    await axios.delete(`api/resumes/education/${id}`);
    dispatch({
      type: DELETE_EDUCATION,
      payload: id
    });
    dispatch(setAlert('Education deleted!', 'danger'));
  } catch (err) {
    console.error(err);
  }
}

// Create Experience
export const createExperience = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.put('/api/resumes/experience', formData, config);
    dispatch({
      type: UPDATE_RESUME,
      payload: res.data
    });

    dispatch(setAlert('Experience created!', 'success'));
    history.push('/');
  } catch (err) {
    console.error(err);
  }
}
// Delete Experience
export const deleteExperience = (id) => async dispatch => {
  console.log(id);
  try {
    await axios.delete(`api/resumes/experience/${id}`);
    dispatch({
      type: DELETE_EXPERIENCE,
      payload: id
    });
    dispatch(setAlert('Project deleted!', 'danger'));
  } catch (err) {
    console.error(err);
  }
}