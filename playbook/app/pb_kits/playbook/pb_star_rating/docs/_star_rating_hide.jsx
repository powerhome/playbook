import React from 'react'

import StarRating from '../_star_rating'

const StarRatingHide = (props) => (

  <StarRating
      hideRating
      rating={3.5}
      {...props}
  />

)

export default StarRatingHide
