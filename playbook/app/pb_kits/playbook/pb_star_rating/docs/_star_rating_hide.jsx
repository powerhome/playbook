import React from 'react'
import StarRating from '../_star_rating'

const StarRatingHide = (props) => (
    <>
        <StarRating
            paddingBottom="xs"
            rating={3}
            {...props}
        />

        <StarRating
            layoutOption={"number"}
            paddingBottom="xs"
            rating={2.8}
            {...props}
        />

        <StarRating
            layoutOption={"number"}
            paddingBottom="xs"
            rating={3}
            {...props}
        />

        <StarRating
            layoutOption={"onestar"}
            paddingBottom="xs"
            rating={1}
            {...props}
        />
    </>
)

export default StarRatingHide
