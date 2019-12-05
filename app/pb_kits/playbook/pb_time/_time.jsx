import React from 'react'
import PropTypes from "prop-types"

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
}

class Time extends React.Component {
  render() {
    return (
      <div className="pb_time">
        <span>TIME CONTENT</span>
      </div>
    )
  }
}

Time.propTypes = propTypes

export default Time
