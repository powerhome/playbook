import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
};

class Icon extends React.Component {
  render() {
    return (
      <div className="pb_icon">
        <span>ICON CONTENT</span>
      </div>
    )
  }
}

Icon.propTypes = propTypes;

export default Icon;
export default Owner;
