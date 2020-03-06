import React from 'react';
import PropTypes from 'prop-types';

const PortfolioItem = ({
  item
}) => {
  return (
    <>
      <img src={item.image} />
    </>
  )
}

PortfolioItem.propTypes = {

}

export default PortfolioItem;