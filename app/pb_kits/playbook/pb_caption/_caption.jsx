import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  tag: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  large: PropTypes.bool,
  dark: PropTypes.bool
};

const defaultProps = {
  tag: "div",
  text: "Hello Cool React Caption",
  large: false,
  dark: false
};

class Caption extends React.Component {
  render() {
    const { tag, text, large, dark } = this.props;
    const Tag = `${tag}`;
    return (
      <Tag
          className={
          `caption` +
          (large === true ? "_lg" : "") +
          (dark === true ? "_dark" : "")
        }
      >
        {text}
      </Tag>
    );
  }
}

Caption.propTypes = propTypes;
Caption.defaultProps = defaultProps;

export default Caption;
