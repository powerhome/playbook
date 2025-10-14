import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { GlobalProps, globalProps } from '../utilities/globalProps'

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
  itemGap?: 'xs' | 'sm' | 'md' | 'lg' | 'none',
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
  itemGap = 'none',
  ...props
}: TimelineProps): React.ReactElement => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const dateStyle = showDate === true ? 'with_date' : ''
  const itemGapStyle = itemGap === 'none' ? '' : `gap_${itemGap}`
  const timelineCss = buildCss('pb_timeline_kit', `${orientation}`, dateStyle, itemGapStyle)

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
