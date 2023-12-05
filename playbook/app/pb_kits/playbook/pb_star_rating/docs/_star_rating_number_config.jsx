import React from 'react'

import StarRating from '../_star_rating'

const StarRatingNumberConfig = (props) => (
  <>

    <StarRating
        denominator={3}
        rating={3}
        {...props}
    />


    <StarRating
        denominator={4}
        rating={3}
        {...props}
    />

    <br />

    <StarRating
        denominator={5}
        rating={3}
        {...props}
    />

    <br />

    <StarRating
        denominator={6}
        rating={3}
        {...props}
    />

    <br />

    <StarRating
        denominator={7}
        rating={3}
        {...props}
    />

    <br />

    <StarRating
        denominator={8}
        rating={3}
        {...props}
    />

  </>
)

export default StarRatingNumberConfig
