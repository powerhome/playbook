/* @flow */

import React from 'react'
import classnames from 'classnames'
import TimelineItem from './_item.jsx'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'

type TimelineProps = {
  aria?: object,
  children?: array<React.ReactChild>,
  className?: String,
  data?: String,
  id?: String,
  orientation?: String,
  showDate?: Boolean,
}

const Timeline = ({
  aria = {},
  className,
  children,
  data = {},
  orientation = 'horizontal',
  showDate = false,
}: TimelineProps) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const dateStyle = showDate === true ? '_with_date' : ''
  const timelineCss = buildCss('pb_timeline_kit', `_${orientation}`, dateStyle)
  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classnames(timelineCss, className)}
    >
      {children}
    </div>
  )
}

Timeline.Item = TimelineItem

export default Timeline
