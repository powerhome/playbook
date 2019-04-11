import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ])
};

class Card extends React.Component {
  render() {
    return (
      <div className="pb_card">
        <div className="pb_card_body">
          { this.props.children }
        </div>
      </div>
    )
  }
}

Card.propTypes = propTypes;

export default Card;
