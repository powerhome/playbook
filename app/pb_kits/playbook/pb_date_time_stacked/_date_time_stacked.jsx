/* @flow */

import React from 'react'
import { DateStacked, Flex, FlexItem, TimeStacked } from '../'
import { globalProps } from '../utilities/globalProps.js'

type DateTimeStackedProps = {
  data?: string,
  id?: string,
  date: Date,
  dark: Boolean,
}

const DateTimeStacked = (props: DateTimeStackedProps) => {
  const { date, dark } = props
  return (
    <Flex
        className={globalProps(props)}
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
