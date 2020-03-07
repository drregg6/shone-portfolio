import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import PortfolioItem from './PortfolioItem';

import { connect } from 'react-redux';
import { fetchPortfolioItem } from '../../actions/portfolio';

const PortfolioItems = ({
  match,
  fetchPortfolioItem,
  portfolio: { loading, portfolioItem }
}) => {
  useEffect(() => {
    const id = match.params.id;
    fetchPortfolioItem(id);
  }, [match.params.id]);

  const renderMe = loading || portfolioItem === null ? (
    <h1>Loading</h1>
  ) : (
    <ul>
        {
          loading || portfolioItem === null ? (<h1>Loading</h1>) : (
            portfolioItem.portfolioItems.map(item => {
              return (
                <li className="portfolio-item">
                  <PortfolioItem item={item} />
                </li>
              )
            })
          )
        }
      </ul>
  );
  return (
    <div className="portfolio-items center-content">
      { renderMe }
    </div>
  )
}

PortfolioItem.propTypes = {
  fetchPortfolioItem: PropTypes.func.isRequired,
  portfolioItem: PropTypes.object
}

const mapStateToProps = state => ({
  portfolio: state.portfolio
});

export default connect(
  mapStateToProps,
  { fetchPortfolioItem }
)(PortfolioItems);