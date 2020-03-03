import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';

import { connect } from 'react-redux';

const Nav = ({
  portfolio: { portfolios, loading },
  isAuthenticated
}) => {

  const renderMe = loading ? (
    <h1>Loading</h1>
  ) : (
    portfolios.map(portfolio => {
      return (
      <h1>{ portfolio.title }</h1>
      )
    })
  )

  return (
    <Col md={4}>
      <h1>Hello world!</h1>
      { renderMe }
    </Col>
  )
}

Nav.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(
  mapStateToProps,
  null
)(Nav);