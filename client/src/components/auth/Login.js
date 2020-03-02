import { Redirect } from 'react-router-dom';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { login } from '../../actions/auth';
import { connect } from 'react-redux';

const Login = ({ login, isAuthenticated }) => {
  const [ formData, setFormData ] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;
  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }
  const handleSubmit = event => {
    event.preventDefault();
    login(email, password);
  }

  if (isAuthenticated) {
    return <Redirect to='/' />
  }

  return (
    <div className="form container">
      <h1>Login</h1>
      <form onSubmit={event => handleSubmit(event)} className="login-form">
        <div className="form-group">
          <input 
            type="email"
            placeholder="Email"
            name="email"
            onChange={event => handleChange(event)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={event => handleChange(event)}
            className="form-input"
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn"
        />
      </form>
    </div>
  )
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
