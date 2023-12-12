import React from "react"
import classnames from "classnames"

import { buildAriaProps, buildDataProps, buildHtmlProps } from "../utilities/props"

import Icon from "../pb_icon/_icon"

type StarRatingProps = {
  aria?: {[key: string]: string},
  className?: string,
  data?: object,
  fixedWidth?: boolean,
  hideRating: boolean,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},,
  icon?: string,
  id?: string,
  rating: number,
};

const StarRating = ({
  aria = {},
  className,
  data = {},
  htmlOptions = {},
  hideRating = false,
  id,
  rating = 0,
}: StarRatingProps) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const css = classnames([
    "pb_star_rating_kit", className,
  ])

  const starCount = () => (
    [...Array(Math.floor(rating))]
  )

  const hasHalfStar = () => (
    rating % 1 !== 0
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={css}
        id={id}
    >
    {!hideRating && (
      <div className="pb_star_rating_number">
        {rating}
      </div>
    )}
      <div className="pb_star_rating_wrapper">
        <div className="pb_star_rating_highlight">
          {starCount().map((_, index) => (
            <Icon
                fixedWidth={false}
                icon="star"
                key={index}
            />
          ))}
          {hasHalfStar() && (
            <Icon
              fixedWidth={false}
              icon="star-half"
            />
          )}
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
