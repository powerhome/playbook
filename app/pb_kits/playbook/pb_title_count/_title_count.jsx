import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
}

class TitleCount extends React.Component {
  render() {
    return (
      <div className="pb_title_count">
        <span>{'TITLE COUNT CONTENT'}</span>
      </div>
    )
  }
}

TitleCount.propTypes = propTypes

export default TitleCount
