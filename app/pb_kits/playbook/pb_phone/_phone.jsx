import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
};

class Phone extends React.Component {
  render() {
    return (
      <div className="pb_phone">
        <span>PHONE CONTENT</span>
      </div>
    )
  }
}

Phone.propTypes = propTypes;

export default Phone;
