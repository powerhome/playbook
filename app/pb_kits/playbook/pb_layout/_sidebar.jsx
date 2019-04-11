import React, { Component } from "react";
import PropTypes from "prop-types";

const propTypes = {
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ])
};

class Sidebar extends Component {
  render() {
    const {
      children
    } = this.props;
    return (
      <div className={`layout_sidebar`}>
        {children}
      </div>
    );
  }
}

Sidebar.propTypes = propTypes;

export default Sidebar;
