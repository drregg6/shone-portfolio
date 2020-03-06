import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { fetchPortfolios } from '../../actions/portfolio';

const Homepage = ({
  portfolio: { loading, portfolios },
  fetchPortfolios
}) => {
  useEffect(() => {
    fetchPortfolios();
  }, [loading]);
  const renderMe = loading ? (
    <h1>l0ading</h1>
  ) : (
    portfolios.map(portfolio => {
      return (
        <div>
          <Link to={`/portfolios/${portfolio._id}`}>
            <img src={portfolio.splash} alt={portfolio.title} />
          </Link>
        </div>
      )
    })
  )

  return (
    <div>
      { renderMe }
    </div>
  )
}

Homepage.propTypes = {
  portfolio: PropTypes.object
}

const mapStateToProps = state => ({
  portfolio: state.portfolio
});

export default connect(
  mapStateToProps,
  { fetchPortfolios }
)(Homepage);