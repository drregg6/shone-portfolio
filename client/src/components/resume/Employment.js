import React from 'react'
import PropTypes from 'prop-types'

const Employment = ({ experience }) => {
  return (
    <div>
      Title: { experience.title }
    </div>
  )
}

Employment.propTypes = {
  experience: PropTypes.array
}

export default Employment;