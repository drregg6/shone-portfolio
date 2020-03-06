import {
  GET_PORTFOLIO,
  GET_PORTFOLIOS,
  GET_PORTFOLIO_ITEM,
  UPDATE_PORTFOLIO,
  DELETE_PORTFOLIO,
  CLEAR_PORTFOLIO,
  CLEAR_PORTFOLIO_ITEM
} from '../actions/types';

const initialState = {
  editPort: {},
  portfolioItem: null,
  portfolios: [],
  loading: true
}

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case GET_PORTFOLIO:
      return {
        ...state,
        editPort: payload,
        loading: false
      }
    case GET_PORTFOLIOS:
      return {
        ...state,
        portfolios: [...payload],
        loading: false
      };
    case UPDATE_PORTFOLIO:
      return {
        ...state,
        portfolios: [...payload],
        loading: false
      };
    case GET_PORTFOLIO_ITEM:
      return {
        ...state,
        portfolioItem: payload
      }
    case CLEAR_PORTFOLIO_ITEM: {
      return {
        ...state,
        portfolioItem: null,
        loading: false
      }
    }
    case DELETE_PORTFOLIO:
      return {
        ...state,
        portfolios: state.portfolios.filter(project => project._id !== payload),
        loading: false
      }
    case CLEAR_PORTFOLIO:
      return {
        ...state,
        editPort: {},
        loading: false
      };
    default:
      return state;
  }
}