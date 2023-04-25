import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'

import TimelineItem from './_item'

type TimelineProps = {
  aria?: { [key: string]: string },
  children?: React.ReactChild[],
  className?: string,
  data?: { [key: string]: string },
  id?: string,
  orientation?: string,
  showDate?: boolean,
}

const Timeline = ({
  aria = {},
  className,
  children,
  data = {},
  id,
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
      id={id}
    >
      {children}
    </div>
  )
}

Timeline.Item = TimelineItem

export default Timeline
