import React from 'react'
import PropTypes from "prop-types"

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
}

class TitleDetail extends React.Component {
  render() {
    return (
      <div className="pb_title_detail">
        <span>TITLE DETAIL CONTENT</span>
      </div>
    )
  }
}

TitleDetail.propTypes = propTypes

export default TitleDetail
