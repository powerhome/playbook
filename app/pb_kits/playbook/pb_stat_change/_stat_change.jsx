import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
};

class StatChange extends React.Component {
  render() {
    return (
      <div className="pb_stat_change">
        <span>STAT CHANGE CONTENT</span>
      </div>
    )
  }
}

StatChange.propTypes = propTypes;

export default StatChange;
