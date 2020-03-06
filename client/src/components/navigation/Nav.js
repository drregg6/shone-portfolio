import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { Col } from 'react-bootstrap';

import { connect } from 'react-redux';
import { fetchPortfolios } from '../../actions/portfolio';

const Nav = ({
  portfolio: { portfolios, loading },
  fetchPortfolios
}) => {
  useEffect(() => {
    fetchPortfolios();
  }, []);

  const portfolioRender = loading ? (
    <h1>Loading</h1>
  ) : (
    portfolios.map(portfolio => {
      return (
        <li>
          <Link to={`/portfolios/${portfolio._id}`}>{ portfolio.title }</Link>
        </li>
      )
    })
  )

  return (
    <div className="nav flex">
      <div className="info flex center">
        <div className="nav-header">
          <h1>Shone Regg</h1>
          <h2>Senior Designer</h2>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">Portfolio</Link>
            </li>
            <li>
              <Link to="/resume">Resume</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="portfolio">
          <ul>
            { portfolioRender }
          </ul>
        </div>
      </div>
      <div className="nav-footer center">
        <p>
          &copy; Shone Regg 2020<br />
          <a href="http://www.daveregg.com" target="_blank">Dave Regg</a>
        </p>
      </div>
    </div>
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