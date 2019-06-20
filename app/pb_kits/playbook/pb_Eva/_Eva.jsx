import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
  className: PropTypes.string,
  text: PropTypes.string
};

const defaultProps = {
  text: "I am a react kit"
};

class Eva extends React.Component {
  render() {
    const {
      className,
      text
    } = this.props;

    return (
      <div className={className}>
        <span>{text}</span>
      </div>
    )
  }
}

Eva.propTypes = propTypes;
Eva.defaultProps = defaultProps;

export default Eva;
