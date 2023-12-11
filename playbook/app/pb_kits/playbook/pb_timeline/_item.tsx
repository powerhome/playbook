import React from 'react'
import classnames from 'classnames'

import { buildCss, buildHtmlProps } from '../utilities/props'

import DateStacked from '../pb_date_stacked/_date_stacked'
import IconCircle from '../pb_icon_circle/_icon_circle'

type ItemProps = {
  className?: string,
  children?: React.ReactNode[] | React.ReactNode,
  date?: Date,
  htmlOptions?: {[key: string]: string | number | boolean | Function},
  icon?: string,
  iconColor?: 'default' | 'royal' | 'blue' | 'purple' | 'teal' | 'red' | 'yellow' | 'green',
  lineStyle?: 'solid' | 'dotted',
}

const TimelineItem = ({
  className,
  children,
  date,
  htmlOptions = {},
  icon = 'user',
  iconColor = 'default',
  lineStyle = 'solid',

}: ItemProps) => {
  const timelineItemCss = buildCss('pb_timeline_item_kit', lineStyle)

  const htmlProps = buildHtmlProps(htmlOptions)

  return (
    <div 
      {...htmlProps}
      className={classnames(timelineItemCss, className)}
    >
      <div className="pb_timeline_item_left_block">
        {date &&
          <DateStacked
            align="center"
            date={date}
            size="sm"
          />
        }
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
