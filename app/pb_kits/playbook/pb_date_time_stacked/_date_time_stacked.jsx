/* @flow */

import React from 'react'
import {
  DateStacked,
  Flex,
  FlexItem,
  TimeStacked,
} from '../'

type DateTimeStackedProps = {
  className?: String,
  data?: String,
  id?: String,
  date: Date,
  dark: Boolean,
}

const DateTimeStacked = ({
  className,
  data,
  id,
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
      />
    </FlexItem>
  </Flex>
)

export default DateTimeStacked
