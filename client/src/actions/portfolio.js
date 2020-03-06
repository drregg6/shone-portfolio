import {
  GET_PORTFOLIO,
  GET_PORTFOLIOS,
  GET_PORTFOLIO_ITEM,
  CLEAR_PORTFOLIO_ITEM,
  UPDATE_PORTFOLIO,
  DELETE_PORTFOLIO,
  CLEAR_PORTFOLIO
} from './types';
import { setAlert } from './alert';
import axios from 'axios';

// Get all portfolios
export const fetchPortfolios = () => async dispatch => {
  try {
    const res = await axios.get(`/api/portfolios/`);
    dispatch({
      type: GET_PORTFOLIOS,
      payload: res.data
    });
  } catch (error) {
    console.error(error);
  }
}

// Get portfolio item
export const fetchPortfolioItem = id => async dispatch => {
  try {
    dispatch({ type: CLEAR_PORTFOLIO_ITEM });
    const res = await axios.get(`/api/portfolios/${id}`);
    dispatch({
      type: GET_PORTFOLIO_ITEM,
      payload: res.data
    });
  } catch (error) {
    console.error(error);
  }
}

// Get one portfolio
// export const fetchPort = (id) => async dispatch => {
//   try {
//     const res = await axios.get(`/api/portfolios/${id}`);
//     console.log(res.data);
//     dispatch({
//       type: GET_PORTFOLIO,
//       payload: res.data.portfolio
//     });
//   } catch (err) {
//     console.error(err);
//   }
// }

// Create / edit a portfolio
export const createPortfolio = (newPortfolio, history, id=null, isEdit=false) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (id) {
    newPortfolio._id = id;
  }
  try {
    const res = await axios.post(`/api/portfolios`, newPortfolio, config);
    dispatch({
      type: UPDATE_PORTFOLIO,
      payload: res.data
    });
    dispatch(setAlert((isEdit ? 'Portfolio Edited' : 'Portfolio Created!'), 'success'));
    if (isEdit) dispatch({ type: CLEAR_PORTFOLIO });

    history.push('/');
  } catch (error) {
    console.error(error);
  }
}

// Delete Portfolio
export const deletePortfolio = (id) => async dispatch => {
  console.log(id);
  console.log(typeof id);
  if (window.confirm("Are you sure? This action CANNOT be undone!")) {
    try {
      await axios.delete(`/api/portfolios/${id}`);
      dispatch({
        type: DELETE_PORTFOLIO,
        payload: id
      });
      dispatch(setAlert('Portfolio deleted', 'success'));
    } catch (err) {
      console.error(err);
    }
  }
}