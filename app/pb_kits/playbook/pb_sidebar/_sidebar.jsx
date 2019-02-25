import React, { Component } from "react";
import PropTypes from "prop-types";

const propTypes = {
  position: PropTypes.oneOf(["left", "right"]),
  transparent: PropTypes.bool,
  size: PropTypes.oneOf(["xs", "sm", "md", "base", "lg", "xl"]),
  collapse: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  full: PropTypes.bool,
  dark: PropTypes.bool,
  children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

const defaultProps = {
  position: "left",
  transparent: false,
  size: "base",
  collapse: "md",
  full: false,
  dark: false
};

class Sidebar extends Component {
  render() {
    const {
      position,
      transparent,
      size,
      collapse,
      full,
      dark,
      children
    } = this.props;
    const dark_class = dark === true ? "_dark" : ""
    const transparent_class = transparent === true ? "_transparent" : ""
    const full_class = full === true ? "_full" : ""
    return (
      <div className={`sidebar_${size}${position}${dark_class}${transparent_class}${full_class}${collapse}`}>
        {children}
      </div>
    );
  }
}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

export default Sidebar;
