
/* @flow */

import React from 'react'
import { buildCss } from '../utilities/props'
import { deprecatedProps, globalProps } from '../utilities/globalProps.js'

import { DateStacked, Flex, FlexItem, SectionSeparator, TimeStacked } from '../'

type DateTimeStackedProps = {
  id?: string,
  date: string,
  datetime: string,
  dark: boolean,
  timeZone?: string,
}

const DateTimeStacked = (props: DateTimeStackedProps) => {
  if (props.date) deprecatedProps('Date Time Stacked', ['date'])

  const {
    date,
    datetime,
    dark,
    timeZone = 'America/New_York',
  } = props

  const classes = buildCss('pb_date_time_stacked_kit', globalProps(props))

  return (
    <Flex
        inline="flex-container"
        vertical="stretch"
        {...props}
    >
      <FlexItem>
        <DateStacked
            align="right"
            bold
            dark={dark}
            date={date || datetime}
            timeZone={timeZone}
        />
      </FlexItem>

      <SectionSeparator
          className="date-time-padding"
          orientation="vertical"
      />
      <FlexItem>
        <TimeStacked
            className={classes}
            dark={dark}
            date={date || datetime}
            tag="caption"
            timeZone={timeZone}
        />
      </FlexItem>
    </Flex>
  )
}

export default DateTimeStacked
