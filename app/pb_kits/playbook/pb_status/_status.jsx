import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
};

class Status extends React.Component {
  render() {
    return (
      <div className="pb_status">
        <span>STATUS CONTENT</span>
      </div>
    )
  }
}

Status.propTypes = propTypes;

export default Status;
