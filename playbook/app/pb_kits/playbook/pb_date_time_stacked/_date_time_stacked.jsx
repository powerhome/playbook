/* @flow */

import React from 'react'
import { DateStacked, Flex, FlexItem, SectionSeparator, TimeStacked } from '../'

type DateTimeStackedProps = {
  data?: string,
  id?: string,
  date: date,
  dark: boolean,
}

const DateTimeStacked = (props: DateTimeStackedProps) => {
  const { date, dark } = props
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
            date={date}
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
            date={date}
            tag="caption"
        />
      </FlexItem>
    </Flex>
  )
}

export default DateTimeStacked
