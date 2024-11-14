import React from 'react'
import classnames from 'classnames'
import { buildHtmlProps } from '../../utilities/props'
import { globalProps, GlobalProps } from "../../utilities/globalProps"
import IconCircle from '../../pb_icon_circle/_icon_circle'

type TimelineStepProps = {
  icon?: string,
  iconColor?: 'default' | 'royal' | 'blue' | 'purple' | 'teal' | 'red' | 'yellow' | 'green',
  children?: React.ReactNode,
  className?: string,
  htmlOptions?: { [key: string]: any },
} & GlobalProps

const TimelineStep: React.FC<TimelineStepProps> = ({
  icon = 'user',
  iconColor = 'default',
  children,
  className,
  htmlOptions = {},
  ...props
}) => {
  const htmlProps = buildHtmlProps(htmlOptions)
  return (
    <div
        {...htmlProps}
        className={classnames('pb_timeline_item_step', globalProps(props), className)}
    >
      {children ? (
        children
      ) : (
        <IconCircle icon={icon}
            size="xs"
            variant={iconColor}
        />
      )}
      <div className="pb_timeline_item_connector" />
    </div>
  )
}

export default TimelineStep
