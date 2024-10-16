import React from 'react'
import classnames from 'classnames'
import { buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from "../utilities/globalProps"
import DateStacked from '../pb_date_stacked/_date_stacked'

type TimelineDateAreaProps = {
  date?: Date,
  className?: string,
  htmlOptions?: { [key: string]: any },
} & GlobalProps

const TimelineDateArea: React.FC<TimelineDateAreaProps> = ({
  date,
  className,
  htmlOptions = {},
  ...props
}) => {
  const htmlProps = buildHtmlProps(htmlOptions)
  return (
    <div
        {...htmlProps}
        className={classnames('pb_timeline_date_area', globalProps(props), className)}
    >
      {date && (
        <DateStacked align="center"
            date={date}
            size="sm"
        />
      )}
    </div>
  )
}

export default TimelineDateArea
