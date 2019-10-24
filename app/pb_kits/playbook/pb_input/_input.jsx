import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Caption } from "../";

const propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const defaultProps = {
  type: "text"
};

class Input extends React.Component {
  render() {
    const {
      className,
      label,
      name,
      onChange,
      placeholder,
      type,
      value
    } = this.props;

    const css = classnames([`pb_input_kit`, className]);

    return (
      <div className="pb_input_kit">
        <Caption text={label} />
        <div className="input_wrapper">
          <input
              className={css}
              name={name}
              onChange={onChange}
              placeholder={placeholder}
              type={type}
              value={value}
          />
        </div>
      </div>
    );
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
