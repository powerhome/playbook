import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { GlobalProps, globalProps } from '../utilities/globalProps'
import { Sizes } from '../types'

import TimelineItem from './_item'
import {
  TimelineStep,
  TimelineLabel,
  TimelineDetail,
} from './subcomponents'

type TimelineProps = {
  aria?: { [key: string]: string },
  children?: React.ReactChild[] | React.ReactChild,
  className?: string,
  data?: { [key: string]: string },
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  orientation?: string,
  showDate?: boolean,
  gap?: Sizes | "none",
} & GlobalProps

const Timeline = ({
  aria = {},
  className,
  children,
  data = {},
  htmlOptions = {},
  id,
  orientation = 'horizontal',
  showDate = false,
  gap = 'none',
  ...props
}: TimelineProps): React.ReactElement => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const dateStyle = showDate === true ? '_with_date' : ''
  const timelineCss = buildCss('pb_timeline_kit', `_gap_${gap}`, `_${orientation}`, dateStyle)
  return (
    <div
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classnames(timelineCss, globalProps(props), className)}
        id={id}
    >
      {children}
    </div>
  )
}

Timeline.Item = TimelineItem
Timeline.Step = TimelineStep
Timeline.Label = TimelineLabel
Timeline.Detail = TimelineDetail

export default Timeline
