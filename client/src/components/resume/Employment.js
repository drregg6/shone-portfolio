import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const Employment = ({
  title,
  company,
  location,
  to,
  from,
  current,
  brands
}) => {
  return (
    <div className="employment">
      <h1 className="bold">{title}</h1>
      <h2 className="italic">{company}</h2>
      <div className="employment-dates">
        {location} &middot; <Moment format="MMM YYYY">{from}</Moment> - { current ? 'Current' : <Moment format="MMM YYYY">{to}</Moment> }
      </div>
      <div className="employment-brands">
        Brands: { brands.map((brand, i) => {
          return (
            <span key={i}>{brand}</span>
          )
        })}
      </div>
    </div>
  )
}

Employment.propTypes = {
  title: PropTypes.string,
  company: PropTypes.string,
  location: PropTypes.string,
  from: PropTypes.string,
  to: PropTypes.string,
  current: PropTypes.bool,
  brands: PropTypes.array
}

export default Employment;