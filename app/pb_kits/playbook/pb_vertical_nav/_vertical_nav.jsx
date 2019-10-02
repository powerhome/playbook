import React, { Component } from "react"
import PropTypes from "prop-types"
import VerticalNavItem from "./_item"
import {Caption} from "../"

const propTypes = {
  children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

class VerticalNav extends Component {
  static VerticalNavItem = VerticalNavItem
  render() {
    return (
      <div className="vertical_nav_list">
        <div className="vertical_nav_list_title">
          <a>
            <Caption />
          </a>
        </div>
        <ul>{this.props.children}</ul>
      </div>
    )
  }
}

VerticalNav.propTypes = propTypes

export default VerticalNav
