import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
};

class Currency extends React.Component {
  render() {
    return (
      <div className="pb_currency">
        <span>{`CURRENCY CONTENT`}</span>
      </div>
    )
  }
}

Currency.propTypes = propTypes;

export default Currency;
