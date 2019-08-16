import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
};

class Toggle extends React.Component {
  render() {
    return (
      <div className="pb_toggle">
        <span>TOGGLE CONTENT</span>
      </div>
    )
  }
}

Toggle.propTypes = propTypes;

export default Toggle;
