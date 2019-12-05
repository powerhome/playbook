import React, { Component } from "react"
import PropTypes from "prop-types"

const propTypes = {
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ])
}

class Body extends Component {
  render() {
    const {
      children
    } = this.props
    return (
      <div className={`layout_body`}>
        {children}
      </div>
    )
  }
}

Body.propTypes = propTypes

export default Body
