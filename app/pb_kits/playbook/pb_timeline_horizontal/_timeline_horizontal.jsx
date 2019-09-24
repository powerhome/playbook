import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
};

class TimelineHorizontal extends React.Component {
  render() {
    return (
      <div className="pb_timeline_horizontal">
        <span>TIMELINE HORIZONTAL CONTENT</span>
      </div>
    )
  }
}

TimelineHorizontal.propTypes = propTypes;

export default TimelineHorizontal;
