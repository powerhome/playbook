import React from "react"
import classnames from "classnames"

import { buildAriaProps, buildDataProps } from "../utilities/props"

import Icon from "../pb_icon/_icon"

import './custom-icons'

type StarRatingProps = {
  aria?: {[key: string]: string},
  className?: string,
  data?: object,
  fixedWidth?: boolean,
  hideRating: boolean,
  icon?: string,
  id?: string,
  rating: number,
  denominator: number,
  colorOption: string,
};

const StarRating = ({
  aria = {},
  className,
  data = {},
  hideRating = true,
  id,
  rating = 0,
  denominator = 5,
  colorOption = "yellow",
}: StarRatingProps) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const css = classnames([
    "pb_star_rating_kit", className,
  ])

  const activeStars = Math.round(rating) > denominator ? denominator : Math.round(rating)
  const emptyStars = denominator - Math.round(rating)
  const colorClass = `${colorOption}_star_color`

  return (
    <div
        {...ariaProps}
        {...dataProps}
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
          {[...Array(activeStars)].map((_) => (
            <div className={colorClass}>
            <Icon
              fixedWidth
              fontStyle="fak"
              icon="newstar"
            />
            </div>
          ))}
          {[...Array(emptyStars)].map((_) => (
            <div className="empty_stars">
              {colorOption === 'outline' && (
                <Icon
                fixedWidth
                fontStyle="fak"
                icon="hallowstar"
              />
              ) }
              {colorOption !== 'outline' && (
                <Icon
                fixedWidth
                fontStyle="fak"
                icon="newstar"
              />
              ) }
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StarRating
