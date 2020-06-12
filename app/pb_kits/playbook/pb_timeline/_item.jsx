/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'
import { DateStacked, IconCircle } from '..'

type ItemProps = {
  className?: string,
  children?: Array<React.Node>,
  date?: Date,
  icon?: string,
  iconColor?: 'default' | 'royal' | 'blue' | 'purple' | 'teal' | 'red' | 'yellow' | 'green',
  lineStyle?: 'solid' | 'dotted',
}

const TimelineItem = ({
  className,
  children,
  date,
  icon = 'user',
  iconColor = 'default',
  lineStyle = 'solid',

}: ItemProps) => {
  const timelineItemCss = buildCss('pb_timeline_item_kit', lineStyle)

  return (
    <div className={classnames(timelineItemCss, className)}>
      <div className="pb_timeline_item_left_block">
        <If condition={date}>
          <DateStacked
              align="center"
              date={date}
              size="sm"
          />
        </If>
      </div>
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
