import React, { useEffect } from 'react'
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Homepage from './components/landing/Homepage';
import Login from './components/auth/Login';

import PrivateRoute from './components/routing/PrivateRoute';

import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import store from './store';

function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <div className="App">
        <Route exact path='/' component={Homepage} />
        <Route exact path='/login' component={Login} />
      </div>
    </Router>
  );
}

export default App;