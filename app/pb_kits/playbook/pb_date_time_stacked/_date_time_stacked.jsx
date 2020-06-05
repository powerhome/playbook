/* @flow */

import React from 'react'
import { DateStacked, Flex, FlexItem, TimeStacked } from '../'
import { spacing } from '../utilities/spacing.js'

type DateTimeStackedProps = {
  data?: String,
  id?: String,
  date: Date,
  dark: Boolean,
}

const DateTimeStacked = (props: DateTimeStackedProps) => {
  const { date, dark } = props
  return (
    <Flex
        className={spacing(props)}
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
}

export default DateTimeStacked
