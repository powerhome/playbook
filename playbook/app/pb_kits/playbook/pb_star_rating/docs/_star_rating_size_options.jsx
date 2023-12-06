import React from 'react'

import StarRating from '../_star_rating'

const StarRatingSizeOptions = (props) => (
  <>

    <StarRating
        paddingBottom="xs"
        rating={3}
        size="xs"
        {...props}
    />


    <StarRating
        paddingBottom="xs"
        rating={3}
        size="sm"
        {...props}
    />


    <StarRating
        paddingBottom="xs"
        rating={3}
        size="md"
        {...props}
    />


    <StarRating
        paddingBottom="xs"
        rating={3}
        size="lg"
        {...props}
    />


    <StarRating
        layoutOption="number"
        paddingBottom="xs"
        rating={3}
        size="lg"
        {...props}
    />


    <StarRating
        layoutOption="onestar"
        paddingBottom="xs"
        rating={3}
        size="lg"
        {...props}
    />

  </>
)

export default StarRatingSizeOptions
