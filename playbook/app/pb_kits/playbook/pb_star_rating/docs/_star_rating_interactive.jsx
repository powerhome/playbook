import React from 'react'
import StarRating from '../_star_rating'

const StarRatingInteractive = (props) => (
    <>
        <StarRating
            label="Add a Rating"
            paddingBottom="xs"
            variant="interactive"
            {...props}
        />
    </>
)

export default StarRatingInteractive
