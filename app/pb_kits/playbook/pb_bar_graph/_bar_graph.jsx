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
        <span>BAR GRAPH CONTENT</span>
      </div>
    )
  }
}

BarGraph.propTypes = propTypes;

export default BarGraph;
