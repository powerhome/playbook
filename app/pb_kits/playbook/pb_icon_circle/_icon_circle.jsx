import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
};

class IconCircle extends React.Component {
  render() {
    return (
      <h1>{`Coming Soon...`}</h1>
    )
  }
}

IconCircle.propTypes = propTypes;

export default IconCircle;
