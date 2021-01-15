/* @flow */

import React from 'react'
import classnames from 'classnames'

import DateTime from '../pb_kit/dateTime.js'
import { buildCss, buildDataProps } from '../utilities/props'
import { deprecatedProps, globalProps } from '../utilities/globalProps.js'

import { Body, Caption } from '../'

type TimeStackedProps = {
  align?: 'left' | 'center' | 'right',
  className?: string | array<string>,
  dark?: boolean,
  data?: object,
  date?: string,
  id?: string,
  time: number | Date,
  timeZone?: string,
}

const TimeStackedDefault = (props: TimeStackedProps) => {
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

  const dateTimestamp = new DateTime({ value: date ? date : new Date(time), zone: timeZone })

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
          {dateTimestamp.toTimeWithMeridian()}
          <Caption
              className="pb_time_stacked"
              color="light"
              dark={dark}
              tag="span"
              text={dateTimestamp.toTimezone()}
          />
        </time>
      </Body>
    </div>
  )
}

export default TimeStackedDefault
