import React from 'react'
import classnames from 'classnames'
import { buildCss, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from "../utilities/globalProps"

import DateStacked from '../pb_date_stacked/_date_stacked'
import IconCircle from '../pb_icon_circle/_icon_circle'

import TimelineDateArea from './_date_area'
import TimelineNodeArea from './_node_area'
import TimelineDetailArea from './_detail_area'

type ItemProps = {
  className?: string,
  children?: React.ReactNode,
  date?: Date,
  htmlOptions?: { [key: string]: any },
  icon?: string,
  iconColor?: 'default' | 'royal' | 'blue' | 'purple' | 'teal' | 'red' | 'yellow' | 'green',
  lineStyle?: 'solid' | 'dotted',
} & GlobalProps

function isElementOfType<P>(
  element: React.ReactNode,
  component: React.ComponentType<P>
): element is React.ReactElement<P> {
  return React.isValidElement<P>(element) && element.type === component
}

const TimelineItem = ({
  className,
  children,
  date,
  htmlOptions = {},
  icon = 'user',
  iconColor = 'default',
  lineStyle = 'solid',
  ...props
}: ItemProps): React.ReactElement => {
  const timelineItemCss = buildCss('pb_timeline_item_kit', lineStyle)
  const htmlProps = buildHtmlProps(htmlOptions)

  const childrenArray = React.Children.toArray(children)

  const dateAreaChild = childrenArray.find(
    (child): child is React.ReactElement => isElementOfType(child, TimelineDateArea)
  )

  const nodeAreaChild = childrenArray.find(
    (child): child is React.ReactElement => isElementOfType(child, TimelineNodeArea)
  )

  const detailAreaChild = childrenArray.find(
    (child): child is React.ReactElement => isElementOfType(child, TimelineDetailArea)
  )

  const otherChildren = childrenArray.filter(
    (child) =>
      !isElementOfType(child, TimelineDateArea) &&
      !isElementOfType(child, TimelineNodeArea) &&
      !isElementOfType(child, TimelineDetailArea)
  )

  return (
    <div
        {...htmlProps}
        className={classnames(timelineItemCss, globalProps(props), className)}
    >
      <div className="pb_timeline_item_left_block">
        {dateAreaChild || (date && (
          <DateStacked align="center"
              date={date}
              size="sm"
          />
        ))}
      </div>
        {nodeAreaChild || (
          <div className="pb_timeline_item_step">
            <IconCircle icon={icon}
                size="xs"
                variant={iconColor}
            />
            <div className="pb_timeline_item_connector" />
          </div>
        )}
      <div className="pb_timeline_item_right_block">
        {detailAreaChild || otherChildren}
      </div>
    </div>
  )
}

export default TimelineItem
