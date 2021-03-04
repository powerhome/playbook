
/* @flow */

import React from 'react'
import { DateStacked, Flex, FlexItem, SectionSeparator, TimeStacked } from '../'

type DateTimeStackedProps = {
  data?: string,
  id?: string,
  datetime: string,
  dark: boolean,
  timeZone?: string,
}

const DateTimeStacked = (props: DateTimeStackedProps) => {
  const { datetime, dark, timeZone = 'America/New_York' } = props
  return (

    <Flex
        inline="flex-container"
        vertical="stretch"
    >
      <FlexItem>
        <DateStacked
            align="right"
            bold
            dark={dark}
            date={datetime}
            timeZone={timeZone}
        />
      </FlexItem>

      <SectionSeparator
          className="date-time-padding"
          orientation="vertical"
      />
      <FlexItem>
        <TimeStacked
            className="pb_date_time_stacked_kit"
            dark={dark}
            date={datetime}
            tag="caption"
            timeZone={timeZone}
        />
      </FlexItem>
    </Flex>
  )
}

export default DateTimeStacked
