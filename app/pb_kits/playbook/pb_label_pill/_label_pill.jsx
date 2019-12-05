import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
}

class LabelPill extends React.Component {
  render() {
    return (
      <div className="pb_label_pill">
        <span>{'LABEL PILL CONTENT'}</span>
      </div>
    )
  }
}

LabelPill.propTypes = propTypes

export default LabelPill
