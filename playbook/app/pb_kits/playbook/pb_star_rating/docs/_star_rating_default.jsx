import React from 'react'

import StarRating from '../_star_rating'

const StarRatingDefault = (props) => (
  <>
    <StarRating />

    <br />

    <StarRating
        rating={3}
        {...props}
    />

    <br />

    <StarRating
        rating={1.5}
        {...props}
    />

    <br />

    <StarRating
        rating={5}
        {...props}
    />
  </>
)

export default StarRatingDefault
