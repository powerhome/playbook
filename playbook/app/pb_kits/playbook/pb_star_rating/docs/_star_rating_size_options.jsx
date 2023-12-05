import React from 'react'

import StarRating from '../_star_rating'

const StarRatingSizeOptions = (props) => (
  <>

    <StarRating
        rating={3}
        size="xs"
        {...props}
    />


    <StarRating
        rating={3}
        size="sm"
        {...props}
    />


    <StarRating
        rating={3}
        size="md"
        {...props}
    />


    <StarRating
        rating={3}
        size="lg"
        {...props}
    />


    <StarRating
        layoutOption="number"
        rating={3}
        size="lg"
        {...props}
    />


    <StarRating
        layoutOption="onestar"
        rating={3}
        size="lg"
        {...props}
    />

  </>
)

export default StarRatingSizeOptions
