/*

TODOS:
= portfolio-forms will need an AddPortfolioItem form

*/

import React, { useEffect } from 'react';
import './App.css';
import { Row, Col } from 'react-bootstrap';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './components/navigation/Nav';

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
import { fetchPortfolios } from './actions/portfolio';
import { connect } from 'react-redux';
import store from './store';

function App({ fetchPortfolios, portfolio }) {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
    fetchPortfolios();
  }, [portfolio]);

  return (
    <Router>
      <div className="App container">
        <Row>
          <Nav portfolio={portfolio} />
          <Switch>
            <Col md={8}>
              <Route exact path='/' component={Homepage} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/contact' component={Contact} />
              <Route exact path='/resume' component={Resume} />
              <PrivateRoute exact path='/new-portfolio' component={CreatePortfolio} />
              <PrivateRoute path='/portfolios/:id/edit' component={EditPortfolio} />
              <PrivateRoute path='/new-resume' component={CreateResume} />
              <PrivateRoute path='/edit-resume' component={EditResume} />
            </Col>
          </Switch>
        </Row>
      </div>
    </Router>
  );
};

const mapStateToProps = state => ({
  portfolio: state.portfolio
});

export default connect(
  mapStateToProps,
  { fetchPortfolios }
)(App);