/* @flow */

import React from 'react'
import {
  DateStacked,
  Flex,
  FlexItem,
  TimeStacked,
} from '../'

type DateTimeStackedProps = {
  data?: String,
  id?: String,
  date: Date,
  dark: Boolean,
}

const DateTimeStacked = ({
  date,
  dark,
}: DateTimeStackedProps) => (
  <Flex
      orientation="row"
      vertical="center"
  >
    <FlexItem>
      <DateStacked
          align="right"
          dark={dark}
          date={date}
          reverse
          size="sm"
      />
    </FlexItem>
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

export default DateTimeStacked
