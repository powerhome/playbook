/* @flow */

import React from 'react'
import classnames from 'classnames'

import {
  buildAriaProps,
  buildDataProps,
} from '../utilities/props'

import {
  Icon,
} from '../'

type StarRatingProps = {
  aria?: object,
  className?: String,
  data?: object,
  fixedWidth?: Boolean,
  hideIcon: Boolean,
  icon?: String,
  id?: String,
  rating: Numeric,
}

const StarRating = ({
  aria = {},
  className,
  data = {},
  fixedWidth,
  hideIcon = false,
  icon,
  id,
  rating = 0,
}: StarRatingProps) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const css = classnames([
    'pb_star_rating_kit',
  ])

  const starCount = () => {
    const intRating = parseInt(rating)

    if (intRating === 1) {
      return [1]
    }
    if (intRating === 2) {
      return [1, 2]
    }
    if (intRating === 3) {
      return [1, 2, 3]
    }
    if (intRating === 4) {
      return [1, 2, 3, 4]
    }
    if (intRating === 5) {
      return [1, 2, 3, 4, 5]
    }
  }

  const isStarFull = () => {
    if ((parseFloat(rating) % 1) === 0) {
      return true
    }
  }

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={css}
        id={id}
    >
      <div
          className="pb_star_rating_number"
          rating={rating}
      >

        // <div className="pb_star_rating_wrapper">
        //   <div className="pb_star_rating_highlight">

        //     <If condition={isStarFull() === true}>

        //       <Icon
        //           fixedWidth
        //           icon="star-half"
        //       />
        //       <Else />

        //       {starCount().map((rating, index) => (
        //         <Icon
        //             fixedWidth
        //             icon="star"
        //             key={index}
        //         />
        //       ))}

        //     </If>

            <div className="pb_star_rating_base">

              <Icon
                  fixedWidth
                  icon="star"
              />

              <Icon
                  fixedWidth
                  icon="star"
              />

              <Icon
                  fixedWidth
                  icon="star"
              />

              <Icon
                  fixedWidth
                  icon="star"
              />

              <Icon
                  fixedWidth
                  icon="star"
              />
            </div>
          </div>
        // </div>
      // </div>
    </div>
  )
}

export default StarRating
