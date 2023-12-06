import React from 'react'

import StarRating from '../_star_rating'

const StarRatingDefault = (props) => (
  <>
    <StarRating
        paddingBottom="xs"
        {...props}
    />


    <StarRating
        paddingBottom="xs"
        rating={0.9}
        {...props}
    />

    <StarRating
        paddingBottom="xs"
        rating={1.5}
        {...props}
    />

    <StarRating
        paddingBottom="xs"
        rating={3}
        {...props}
    />

    <StarRating
        paddingBottom="xs"
        rating={4.2}
        {...props}
    />

    <StarRating
        paddingBottom="xs"
        rating={5}
        {...props}
    />
  </>
)

export default StarRatingDefault
