import React from 'react'

import StarRating from '../_star_rating'

const StarRatingDefault = (props) => (
  <>
    <StarRating {...props} />


    <StarRating
        rating={0.9}
        {...props}
    />

    <StarRating
        rating={1.5}
        {...props}
    />

    <StarRating
        rating={3}
        {...props}
    />

    <StarRating
        rating={4.2}
        {...props}
    />

    <StarRating
        rating={5}
        {...props}
    />
  </>
)

export default StarRatingDefault
