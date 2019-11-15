import React, { Component } from "react";
import PropTypes from "prop-types";

const propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string,
  active: PropTypes.bool
};

const defaultProps = {
  text: "Hello Item",
  link: "#",
  active: false
};

class NavItem extends Component {
  render() {
    const { text, link, active } = this.props;
    return (
      <li className={"pb_nav_list_border_item" + active}>
        <a className="pb_nav_list_item_link"
            href={link}
        >
          <span className="pb_nav_list_item_text">{text}</span>
        </a>
      </li>
    );
  }
}

NavItem.propTypes = propTypes;
NavItem.defaultProps = defaultProps;

export default NavItem;
