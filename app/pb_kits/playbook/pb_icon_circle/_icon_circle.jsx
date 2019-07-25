import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
};

class IconCircle extends React.Component {
  render() {
    return (
      <div className="pb_icon_circle">
        <span>ICON CIRCLE CONTENT</span>
      </div>
    )
  }
}

IconCircle.propTypes = propTypes;

export default IconCircle;
