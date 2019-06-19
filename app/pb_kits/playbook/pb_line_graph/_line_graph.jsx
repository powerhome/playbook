import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
  className: PropTypes.string,
  text: PropTypes.string
};

const defaultProps = {
  text: "I am a react kit"
};

class LineGraph extends React.Component {
  render() {
    const {
      className,
      text
    } = this.props;

    return (
      <div className={className}>
        <span>{text}</span>
      </div>
    )
  }
}

LineGraph.propTypes = propTypes;
LineGraph.defaultProps = defaultProps;

export default LineGraph;
