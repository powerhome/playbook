/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
};

class TimeStacked extends React.Component {
  render() {
    return (
      <div className="pb_time_stacked">
        <span>TIME STACKED CONTENT</span>
      </div>
    )
  }
}

TimeStacked.propTypes = propTypes;

export default TimeStacked;
