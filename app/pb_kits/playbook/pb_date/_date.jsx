import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
}

class Date extends React.Component {
  render() {
    return (
      <div className="pb_date">
        <span>DATE CONTENT</span>
      </div>
    )
  }
}

Date.propTypes = propTypes

export default Date
