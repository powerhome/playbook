import React from 'react'
import { StarRating } from '../../'

const StarRatingDefault = () => (
  <>
    <StarRating />

    <br />

    <StarRating
        rating={3}
    />

    <br />

    <StarRating
        rating={1.5}
    />

    <br />

    <StarRating
        rating={5}
    />
  </>
)

export default StarRatingDefault
