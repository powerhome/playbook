
/* @flow */

import React from 'react'

import { buildCss } from '../utilities/props'
import { deprecatedProps, globalProps } from '../utilities/globalProps'

import Flex from '../pb_flex/_flex'
import FlexItem from '../pb_flex/_flex_item'
import SectionSeparator from '../pb_section_separator/_section_separator'
import TimeStacked from '../pb_time_stacked/_time_stacked'
import DateStacked from '../pb_date_stacked/_date_stacked'

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
