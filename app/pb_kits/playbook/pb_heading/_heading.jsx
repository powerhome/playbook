import React, { Component } from "react";
import PropTypes from "prop-types";

const propTypes = {
  text: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  size: PropTypes.oneOf([1, 2, 3, 4]).isRequired,
  dark: PropTypes.bool
};

const defaultProps = {
  text: "Hello World",
  tag: "h1",
  size: 1,
  dark: false
};

class Heading extends Component {
  render() {
    const Tag = `${this.props.tag}`;
    const { size, dark, text } = this.props;
    return (
      <Tag className={`heading_${size}` + (dark === true ? "_dark" : "")}>
        {text}
      </Tag>
    );
  }
}

Heading.propTypes = propTypes;
Heading.defaultProps = defaultProps;

export default Heading;
