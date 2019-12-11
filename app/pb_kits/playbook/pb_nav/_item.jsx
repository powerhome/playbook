import React, { Component } from "react";
import PropTypes from "prop-types";

const propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string,
  active: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

const defaultProps = {
  link: "#",
  active: false,
  text: ''
};

class NavItem extends Component {
  render() {
    const { 
      text, 
      link, 
      active, 
      children
    } = this.props;
    const active_class = active === true ? "_active" : ""
    return (
      <li className={`pb_nav_list_border_item${active_class}`}>
        <a className="pb_nav_list_item_link" href={link}>
          <span className="pb_nav_list_item_text">
            { text || children }
          </span>
        </a>
      </li>
    );
  }
}

NavItem.propTypes = propTypes;
NavItem.defaultProps = defaultProps;

export default NavItem;
