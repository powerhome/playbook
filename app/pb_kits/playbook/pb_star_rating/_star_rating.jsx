import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string
};

class StarRating extends React.Component {
  render() {
    return (
      <div className="pb_star_rating">
        <span>STAR RATING CONTENT</span>
      </div>
    )
  }
}

StarRating.propTypes = propTypes;

export default StarRating;
