import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
};

class ProgressSimple extends React.Component {
  render() {
    return (
      <div className="pb_progress_simple">
        <span>PROGRESS SIMPLE CONTENT</span>
      </div>
    )
  }
}

ProgressSimple.propTypes = propTypes;

export default ProgressSimple;
