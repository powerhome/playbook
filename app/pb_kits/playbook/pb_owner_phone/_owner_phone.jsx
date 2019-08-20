import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
};

class OwnerPhone extends React.Component {
  render() {
    return (
      <div className="pb_owner_phone">
        <span>OWNER PHONE CONTENT</span>
      </div>
    )
  }
}

OwnerPhone.propTypes = propTypes;

export default OwnerPhone;
