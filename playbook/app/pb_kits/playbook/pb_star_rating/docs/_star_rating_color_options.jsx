import React from 'react'

import StarRating from '../_star_rating'

const StarRatingColorOptions = (props) => (
  <>

    <StarRating
        paddingBottom="xs"
        rating={3}
        {...props}
    />


    <StarRating
        colorOption='outline'
        paddingBottom="xs"
        rating={3}
        {...props}
    />

    <StarRating
        colorOption='primary'
        paddingBottom="xs"
        rating={3}
        {...props}
    />

    <StarRating
        colorOption='subtle'
        paddingBottom="xs"
        rating={3}
        {...props}
    />

  </>
)

export default StarRatingColorOptions
