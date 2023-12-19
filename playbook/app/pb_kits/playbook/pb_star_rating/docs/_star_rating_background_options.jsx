import React from 'react'

import StarRating from '../_star_rating'

const StarRatingBackgroundOptions = (props) => (
  <>

    <StarRating
        paddingBottom="xs"
        rating={3}
        {...props}
    />


    <StarRating
        backgroundType='outline'
        paddingBottom="xs"
        rating={3}
        {...props}
    />

  </>
)

export default StarRatingBackgroundOptions
