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
  className?: string,
  data?: object,
  fixedWidth?: boolean,
  hideRating: boolean,
  icon?: string,
  id?: string,
  rating: number,
}

const StarRating = ({
  aria = {},
  className,
  data = {},
  hideRating = false,
  id,
  rating = 0,
}: StarRatingProps) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const css = classnames([
    'pb_star_rating_kit', className,
  ])

  const starCount = () => (
    [...Array(parseInt(rating))]
  )

  const hasHalfStar = () => (
    parseFloat(rating) % 1 !== 0
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={css}
        id={id}
    >
      <div className="pb_star_rating_number">
        <If condition={!hideRating}>
          {rating}
        </If>
      </div>

      <div className="pb_star_rating_wrapper">
        <div className="pb_star_rating_highlight">
          {starCount().map((_, index) => (
            <Icon
                fixedWidth
                icon="star"
                key={index}
            />
          ))}

          <If condition={hasHalfStar()}>
            <Icon
                fixedWidth
                icon="star-half"
            />
          </If>
        </div>

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
    </div>
  )
}

export default StarRating
