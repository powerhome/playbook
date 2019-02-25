import React, { Component } from "react";
import PropTypes from "prop-types";

const propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["primary", "danger", "dashed"]),
  size: PropTypes.oneOf(["large", "medium", "small"]),
  dark: PropTypes.bool,
  wrapperclass: PropTypes.string,
  componentclass: PropTypes.string
};

const defaultProps = {
  text: "Button",
  type: null,
  size: null,
  dark: false,
  wrapperclass: 'kit_btn_wrapper',
  componentclass: ''

};

class Button extends Component {
  render() {
    const { text, type, size, dark, wrapperclass, componentclass} = this.props;

    return (
      <div className={wrapperclass}>
        <button className={'kit_btn' + (type !== null ? `_${type}` : "" ) + (size !== null ? `_${size}` : "" ) + (dark === true ? "_dark" : "") + (componentclass !== "" ? `${componentclass}` : ""  )}>
            <span>{text}</span>
        </button>
      </div>
    );
  }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
