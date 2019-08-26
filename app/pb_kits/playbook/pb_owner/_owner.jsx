import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
};

class Owner extends React.Component {
  render() {
    return (
      <div className="pb_owner">
        <span>OWNER CONTENT</span>
      </div>
    )
  }
}

Owner.propTypes = propTypes;

export default Owner;
