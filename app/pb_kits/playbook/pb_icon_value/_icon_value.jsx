import React from 'react'
import PropTypes from "prop-types"

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
}

class IconValue extends React.Component {
  render() {
    return (
      <div className="pb_icon_value">
        <span>ICON VALUE CONTENT</span>
      </div>
    )
  }
}

IconValue.propTypes = propTypes

export default IconValue
