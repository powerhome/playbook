import React from 'react'

import StarRating from '../_star_rating'

const StarRatingColorOptions = (props) => (
  <>

    <StarRating
        rating={3}
        {...props}
    />


    <StarRating
        colorOption='outline'
        rating={3}
        {...props}
    />

    <StarRating
        colorOption='primary'
        rating={3}
        {...props}
    />

    <StarRating
        colorOption='subtle'
        rating={3}
        {...props}
    />

  </>
)

export default StarRatingColorOptions
