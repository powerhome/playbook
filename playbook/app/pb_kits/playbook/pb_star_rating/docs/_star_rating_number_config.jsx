import React from 'react'

import StarRating from '../_star_rating'

const StarRatingNumberConfig = (props) => (
  <>

    <StarRating
        denominator={3}
        paddingBottom="xs"
        rating={3}
        {...props}
    />


    <StarRating
        denominator={4}
        paddingBottom="xs"
        rating={3}
        {...props}
    />


    <StarRating
        denominator={5}
        paddingBottom="xs"
        rating={3}
        {...props}
    />


    <StarRating
        denominator={6}
        paddingBottom="xs"
        rating={3}
        {...props}
    />


    <StarRating
        denominator={7}
        paddingBottom="xs"
        rating={3}
        {...props}
    />


    <StarRating
        denominator={8}
        paddingBottom="xs"
        rating={3}
        {...props}
    />

  </>
)

export default StarRatingNumberConfig
