import React from 'react'
import classnames from 'classnames'
import { buildHtmlProps } from '../../utilities/props'
import { globalProps, GlobalProps } from "../../utilities/globalProps"
import DateStacked from '../../pb_date_stacked/_date_stacked'

type TimelineLabelProps = {
  date?: Date,
  children?: React.ReactNode,
  className?: string,
  htmlOptions?: { [key: string]: any },
  showCurrentYear?: boolean,
} & GlobalProps

const TimelineLabel: React.FC<TimelineLabelProps> = ({
  date,
  children,
  className,
  htmlOptions = {},
  showCurrentYear = false,
  ...props
}) => {
  const htmlProps = buildHtmlProps(htmlOptions)
  return (
    <div
        {...htmlProps}
        className={classnames('pb_timeline_item_left_block', globalProps(props), className)}
    >
      {children}
      {date && (
        <DateStacked align="center"
            date={date}
            showCurrentYear={showCurrentYear}
            size="sm"
        />
      )}
    </div>
  )
}

export default TimelineLabel
