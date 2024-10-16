import React from 'react'
import classnames from 'classnames'
import { buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from "../utilities/globalProps"
import IconCircle from '../pb_icon_circle/_icon_circle'

type TimelineNodeAreaProps = {
  icon?: string,
  iconColor?: 'default' | 'royal' | 'blue' | 'purple' | 'teal' | 'red' | 'yellow' | 'green',
  className?: string,
  htmlOptions?: { [key: string]: any },
} & GlobalProps

const TimelineNodeArea: React.FC<TimelineNodeAreaProps> = ({
  icon = 'user',
  iconColor = 'default',
  className,
  htmlOptions = {},
  ...props
}) => {
  const htmlProps = buildHtmlProps(htmlOptions)
  return (
    <div
        {...htmlProps}
        className={classnames('pb_timeline_node_area', globalProps(props), className)}
    >
      <IconCircle icon={icon}
          size="xs"
          variant={iconColor}
      />
      <div className="pb_timeline_item_connector" />
    </div>
  )
}

export default TimelineNodeArea
