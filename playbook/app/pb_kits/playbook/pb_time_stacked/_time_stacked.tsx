import React from 'react'
import classnames from 'classnames'

import { buildCss, buildDataProps } from '../utilities/props'
import { deprecatedProps, globalProps } from '../utilities/globalProps'
import { toTimeWithMeridiem, toTimeZone } from '../pb_kit/dateTime'

import Body from '../pb_body/_body'
import Caption from '../pb_caption/_caption'

type TimeStackedProps = {
  align?: 'left' | 'center' | 'right',
  className?: string | string[],
  dark?: boolean,
  data?: { [key: string]: string },
  date?: Date,
  id?: string,
  time?: number | Date,
  timeZone?: string,
}

const TimeStackedDefault = (props: TimeStackedProps): React.ReactElement => {
  if (props.date) deprecatedProps('Time Stacked', ['date']) //date prop is deprecated, use time instead

  const {
    align = 'left',
    className,
    dark,
    data = {},
    date,
    time,
    timeZone,
  } = props

  const classes = classnames(
    buildCss('pb_time_stacked_kit', align),
    globalProps(props),
    className
  )
  const dataProps = buildDataProps(data)

  return (
    <div
        className={classes}
        {...dataProps}
    >
      <Body
          className={classnames('pb_time_stacked', 'time-spacing')}
          color="light"
          dark={dark}
      >
        <time>
          {toTimeWithMeridiem(date ? date : new Date(time), timeZone)}
          <Caption
              className="pb_time_stacked"
              color="light"
              dark={dark}
              tag="span"
              text={toTimeZone(date ? date : new Date(time), timeZone)}
          />
        </time>
      </Body>
    </div>
  )
}

export default TimeStackedDefault
