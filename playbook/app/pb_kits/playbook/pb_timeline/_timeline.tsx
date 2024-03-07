import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'

import TimelineItem from './_item'

type TimelineProps = {
  aria?: { [key: string]: string },
  children?: React.ReactChild[] | React.ReactChild,
  className?: string,
  data?: { [key: string]: string },
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  orientation?: string,
  showDate?: boolean,
}

const Timeline = ({
  aria = {},
  className,
  children,
  data = {},
  htmlOptions = {},
  id,
  orientation = 'horizontal',
  showDate = false,
}: TimelineProps) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const dateStyle = showDate === true ? '_with_date' : ''
  const timelineCss = buildCss('pb_timeline_kit', `_${orientation}`, dateStyle)
  return (
    <div
      {...ariaProps}
      {...dataProps}
      {...htmlProps}
      className={classnames(timelineCss, className)}
      id={id}
    >
      {children}
    </div>
  )
}

Timeline.Item = TimelineItem

export default Timeline
