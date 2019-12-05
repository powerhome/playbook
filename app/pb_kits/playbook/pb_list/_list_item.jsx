import React, { Component } from "react"
import PropTypes from "prop-types"

const propTypes = {
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ])
}

class ListItem extends Component {
  render() {
    const {
      children
    } = this.props
    return (
      <li>
        {children}
      </li>
    )
  }
}

ListItem.propTypes = propTypes

export default ListItem
