/*

TODOS:
= portfolio-forms will need an AddPortfolioItem form

*/

import React, { useEffect } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Homepage from './components/landing/Homepage';
import Resume from './components/resume/Resume';
import Contact from './components/contact/Contact';
import Login from './components/auth/Login';

import PrivateRoute from './components/routing/PrivateRoute';
import CreatePortfolio from './components/portfolio-forms/CreatePortfolio';
import EditPortfolio from './components/portfolio-forms/EditPortfolio';
import CreateResume from './components/resume-forms/CreateResume';
import EditResume from './components/resume-forms/EditResume';

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
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/resume' component={Resume} />
          <PrivateRoute exact path='/new-portfolio' component={CreatePortfolio} />
          <PrivateRoute path='/portfolios/:id/edit' component={EditPortfolio} />
          <PrivateRoute path='/new-resume' component={CreateResume} />
          <PrivateRoute path='/edit-resume' component={EditResume} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;