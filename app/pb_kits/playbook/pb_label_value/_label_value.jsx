import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
}

class LabelValue extends React.Component {
  render() {
    return (
      <div className="pb_label_value">
        <span>LABEL VALUE CONTENT</span>
      </div>
    )
  }
}

LabelValue.propTypes = propTypes

export default LabelValue
