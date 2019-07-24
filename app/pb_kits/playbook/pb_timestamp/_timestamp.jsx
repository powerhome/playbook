import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
};

class Timestamp extends React.Component {
  render() {
    return (
      <div className="pb_timestamp">
        <span>TIMESTAMP CONTENT</span>
      </div>
    )
  }
}

Timestamp.propTypes = propTypes;

export default Timestamp;
