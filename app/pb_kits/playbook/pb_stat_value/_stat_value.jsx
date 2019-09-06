import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
};

class StatValue extends React.Component {
  render() {
    return (
      <div className="pb_stat_value">
        <span>STAT VALUE CONTENT</span>
      </div>
    )
  }
}

StatValue.propTypes = propTypes;

export default StatValue;
