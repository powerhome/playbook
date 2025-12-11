import React from 'react'
import classnames from 'classnames'
import { buildCss, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from "../utilities/globalProps"

import DateStacked from '../pb_date_stacked/_date_stacked'
import IconCircle from '../pb_icon_circle/_icon_circle'

import TimelineLabel from './subcomponents/Label'
import TimelineStep from './subcomponents/Step'
import TimelineDetail from './subcomponents/Detail'

type ItemProps = {
  className?: string,
  children?: React.ReactNode[] | React.ReactNode,
  date?: Date,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  icon?: string,
  iconColor?: 'default' | 'royal' | 'blue' | 'purple' | 'teal' | 'red' | 'yellow' | 'green',
  lineStyle?: 'solid' | 'dotted',
  showCurrentYear?: boolean,
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
  showCurrentYear = false,
  ...props
}: ItemProps): React.ReactElement => {
  const timelineItemCss = buildCss('pb_timeline_item_kit', lineStyle)

  const htmlProps = buildHtmlProps(htmlOptions)

  const childrenArray = React.Children.toArray(children)

  const labelChild = childrenArray.find(
    (child): child is React.ReactElement => isElementOfType(child, TimelineLabel)
  )

  const stepChild = childrenArray.find(
    (child): child is React.ReactElement => isElementOfType(child, TimelineStep)
  )

  const detailChild = childrenArray.find(
    (child): child is React.ReactElement => isElementOfType(child, TimelineDetail)
  )

  const otherChildren = childrenArray.filter(
    (child) =>
      !isElementOfType(child, TimelineLabel) &&
      !isElementOfType(child, TimelineStep) &&
      !isElementOfType(child, TimelineDetail)
  )

  return (
    <div
        {...htmlProps}
        className={classnames(timelineItemCss, globalProps(props), className)}
    >
        {labelChild || (
          <div className="pb_timeline_item_left_block">
            {date && (
              <DateStacked
                  align="center"
                  date={date}
                  showCurrentYear={showCurrentYear}
                  size="sm"
              />
            )}
          </div>
        )}
        {stepChild || (
          <div className="pb_timeline_item_step">
            <IconCircle icon={icon}
                size="xs"
                variant={iconColor}
            />
            <div className="pb_timeline_item_connector" />
          </div>
        )}
        {detailChild || (
          <div className="pb_timeline_item_right_block">
           { otherChildren }
          </div>
        )}
    </div>
  )
}

export default TimelineItem
