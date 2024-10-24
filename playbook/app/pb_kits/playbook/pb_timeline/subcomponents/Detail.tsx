import React from 'react'
import classnames from 'classnames'
import { buildHtmlProps } from '../../utilities/props'
import { globalProps, GlobalProps } from "../../utilities/globalProps"

type TimelineDetailProps = {
  children?: React.ReactNode,
  className?: string,
  htmlOptions?: { [key: string]: any },
} & GlobalProps

const TimelineDetail: React.FC<TimelineDetailProps> = ({
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

export default TimelineDetail
