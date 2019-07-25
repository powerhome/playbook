import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
};

class BarGraph extends React.Component {
  render() {
    return (
      <div className="pb_bar_graph">
        <div id="highcharts-5nzaf00-0" />
      </div>
    )
  }
}

BarGraph.propTypes = propTypes;

export default BarGraph;
