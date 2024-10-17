import React from 'react'
import classnames from 'classnames'
import { buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from "../utilities/globalProps"

type TimelineDetailAreaProps = {
  children?: React.ReactNode,
  className?: string,
  htmlOptions?: { [key: string]: any },
} & GlobalProps

const TimelineDetailArea: React.FC<TimelineDetailAreaProps> = ({
  children,
  className,
  htmlOptions = {},
  ...props
}) => {
  const htmlProps = buildHtmlProps(htmlOptions)
  return (
    <div
        {...htmlProps}
        className={classnames('pb_timeline_item_right_block', globalProps(props), className)}
    >
      {children}
    </div>
  )
}

export default TimelineDetailArea
