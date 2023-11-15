import React from 'react'

import StarRating from '../_star_rating'

const StarRatingHide = (props) => (
  <>

    <StarRating
        rating={3}
        {...props}
    />

    <br />

    <StarRating
        layoutOption={"number"}
        rating={3}
        {...props}
    />

    <br />

    <StarRating
        layoutOption={"onestar"}
        rating={3}
        {...props}
    />

  </>
)

export default StarRatingHide
