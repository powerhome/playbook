import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
};

class ButtonGroup extends React.Component {
  render() {
    return (
      <div className="pb_button_group">
        <span>BUTTON GROUP CONTENT</span>
      </div>
    )
  }
}

ButtonGroup.propTypes = propTypes;

export default ButtonGroup;
