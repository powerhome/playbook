import React from 'react'

import StarRating from '../_star_rating'

const StarRatingDefault = (props) => (
  <>
    <StarRating
        paddingBottom="xs"
        {...props}
    />

    <StarRating
        rating={0.9}
        paddingBottom="xs"
        {...props}
    />

    <StarRating
        rating={1.5}
        paddingBottom="xs"
        {...props}
    />

    <StarRating
        rating={3}
        paddingBottom="xs"
        {...props}
    />

    <StarRating
        rating={4.2}
        paddingBottom="xs"
        {...props}
    />

    <StarRating
        rating={5}
        paddingBottom="xs"
        {...props}
    />
  </>
)

export default StarRatingDefault
