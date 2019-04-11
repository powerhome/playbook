import React, { Component } from "react";
import PropTypes from "prop-types";

const propTypes = {
  text: PropTypes.string.isRequired,
  tag: PropTypes.string,
  color: PropTypes.string,
  dark: PropTypes.bool
};

const defaultProps = {
  text: "Hello Body Component",
  tag: "p",
  color: "",
  dark: false
};

class Body extends Component {
  render() {
    const { tag, text, color, dark } = this.props;
    // If color prop is not an empty string then render the given class
    const colorstyle = color !== "" ? `_${color}` : "";

    // If dark prop is true add the '-dark' class
    const themestyle = dark === true ? "_dark" : "";

    const Tag = `${tag}`;

    return <Tag className={"body" + colorstyle + themestyle}>{text}</Tag>;
  }
}

Body.propTypes = propTypes;
Body.defaultProps = defaultProps;

export default Body;
