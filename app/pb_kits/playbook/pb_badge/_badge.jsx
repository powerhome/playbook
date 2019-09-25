/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import classnames from 'classnames'

type BadgeProps = {
  class?: String,
  className?: String,
  data?: String,
  id?: String,
  text?: String,
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral',
  rectangle?: Boolean
}
const Badge = ({
  className,
  id,
  text,
  variant = 'neutral',
  rectangle = false
}: BadgeProps) => {
  const rectangleValue = rectangle == true ? "rectangle" : ""
  const css = classnames([
    `pb_badge_kit_${variant}_${rectangleValue}`,
    className,
  ])

  return (
    <div id={id} className={css}>
        {text}
    </div>
  )
}

export default Badge
