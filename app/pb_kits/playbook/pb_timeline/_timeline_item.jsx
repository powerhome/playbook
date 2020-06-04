/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'
import { DateStacked, IconCircle } from '..'

type TimelineItemProps = {
  className?: String,
  children?: Array<React.ReactChild>,
  date?: Date,
  icon?: String,
  iconColor?: String,
  lineStyle?: String,
}

const TimelineItem = ({
  className,
  children,
  date,
  icon = 'user',
  iconColor = 'default',
  lineStyle = 'solid',

}: TimelineItemProps) => {
  const timelineItemCss = buildCss('pb_timeline_item_kit', lineStyle)

  return (
    <div className={classnames(timelineItemCss, className)}>
      <If condition={date}>
        <DateStacked
            align="left"
            date={date}
            size="sm"
        />
      </If>
      <div className="pb_timeline_item_step">
        <IconCircle
            icon={icon}
            size="xs"
            variant={iconColor}
        />
        <div className="pb_timeline_item_connector" />
      </div>
      <div className="pb_timeline_item_right_block">
        {children}
      </div>
    </div>
  )
}

export default TimelineItem
