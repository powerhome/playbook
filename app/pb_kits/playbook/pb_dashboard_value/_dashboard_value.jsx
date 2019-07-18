import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
};

class DashboardValue extends React.Component {
  render() {
    return (
      <div className="pb_dashboard_value">
        <span>DASHBOARD VALUE CONTENT</span>
      </div>
    )
  }
}

DashboardValue.propTypes = propTypes;

export default DashboardValue;
