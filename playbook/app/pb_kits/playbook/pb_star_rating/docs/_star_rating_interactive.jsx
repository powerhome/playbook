import React from 'react'
import StarRating from '../_star_rating'

const StarRatingInteractive = (props) => (
    <>
        <StarRating
            paddingBottom="xs"
            variant="interactive"
            {...props}
        />
    </>
)

export default StarRatingInteractive
