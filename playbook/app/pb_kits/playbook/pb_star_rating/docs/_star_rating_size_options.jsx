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

    <br />

    <StarRating
        rating={3}
        size="md"
        {...props}
    />

    <br />

    <StarRating
        rating={3}
        size="lg"
        {...props}
    />

    <br />

    <StarRating
        layoutOption="number"
        rating={3}
        size="lg"
        {...props}
    />

    <br />

    <StarRating
        layoutOption="onestar"
        rating={3}
        size="lg"
        {...props}
    />

  </>
)

export default StarRatingSizeOptions
