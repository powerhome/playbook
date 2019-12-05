import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NavItem from './_item'
import { Caption } from '../'

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

class Nav extends Component {
  static NavItem = NavItem
  render() {
    return (
      <div className="pb_nav_list">
        <div className="pb_nav_list_title">
          <a>
            <Caption />
          </a>
        </div>
        <ul>{this.props.children}</ul>
      </div>
    )
  }
}

Nav.propTypes = propTypes

export default Nav
