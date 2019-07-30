import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
};

class Pill extends React.Component {
  render() {
    return (
      <div className="pb_pill">
        <span>PILL CONTENT</span>
      </div>
    )
  }
}

Pill.propTypes = propTypes;

export default Pill;
