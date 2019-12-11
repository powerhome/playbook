import React, { Component } from "react"
import PropTypes from "prop-types"
import NavItem from "./_item"
import {Caption} from "../"

const propTypes = {
  link: PropTypes.string,
  title: PropTypes.string,
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
  children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

class Nav extends Component {
  static NavItem = NavItem
  render() {
    const {
      title='',
      orientation='vertical',
    } = this.props;
    return (
      <div className={`pb_nav_list_${orientation}`}>
        <div className={`pb_nav_list_title`}>
          <a className="pb_nav_list_item_link_text">
            <Caption size="md" text={`${title}`} />
          </a>
        </div>
        <ul>{this.props.children}</ul>
      </div>
    )
  }
}

Nav.propTypes = propTypes

export default Nav
