import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';

import { connect } from 'react-redux';
import { fetchPortfolios } from '../../actions/portfolio';

const Nav = ({
  portfolio: { portfolios, loading },
  fetchPortfolios,
  isAuthenticated
}) => {
  useEffect(() => {
    fetchPortfolios();
  }, []);

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
  isAuthenticated: PropTypes.bool,
  fetchPortfolios: PropTypes.func.isRequired,
  portfolio: PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  portfolio: state.portfolio
})

export default connect(
  mapStateToProps,
  { fetchPortfolios }
)(Nav);