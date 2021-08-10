/* @flow */

import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildDataProps } from '../utilities/props'

import Icon from '../pb_icon/_icon'

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
      <If condition={!hideRating}>
        <div className="pb_star_rating_number">
          {rating}
        </div>
      </If>

      <div className="pb_star_rating_wrapper">
        <div className="pb_star_rating_highlight">
          {starCount().map((_, index) => (
            <Icon
                fixedWidth={false}
                icon="star"
                key={index}
            />
          ))}

          <If condition={hasHalfStar()}>
            <Icon
                fixedWidth={false}
                icon="star-half"
            />
          </If>
        </div>

        <div className="pb_star_rating_base">
          <Icon
              fixedWidth={false}
              icon="star"
          />
          <Icon
              fixedWidth={false}
              icon="star"
          />
          <Icon
              fixedWidth={false}
              icon="star"
          />
          <Icon
              fixedWidth={false}
              icon="star"
          />
          <Icon
              fixedWidth={false}
              icon="star"
          />
        </div>
      </div>
    </div>
  )
}

export default StarRating
