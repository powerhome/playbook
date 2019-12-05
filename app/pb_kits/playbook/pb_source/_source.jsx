import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
}

class Source extends React.Component {
  render() {
    return (
      <div className="pb_source">
        <span>SOURCE CONTENT</span>
      </div>
    )
  }
}

Source.propTypes = propTypes

export default Source
