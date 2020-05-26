import React from 'react'
import { StarRating } from '../../'

const StarRatingDefault = () => (
  <>
    <StarRating />

    <StarRating
        rating={3}
    />

    <StarRating
        rating={1.5}
    />

    <StarRating
        rating={5}
    />
  </>
)

export default StarRatingDefault
