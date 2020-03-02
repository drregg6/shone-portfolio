import { combineReducers } from 'redux';

import portfolio from './portfolio';
import resume from './resume';
import alert from './alert';
import auth from './auth';

export default combineReducers({
  portfolio,
  resume,
  alert,
  auth
});