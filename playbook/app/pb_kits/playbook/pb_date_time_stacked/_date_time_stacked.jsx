/* @flow */

import React from 'react'
import { DateStacked, Flex, FlexItem, TimeStacked } from '../'
import { buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type DateTimeStackedProps = {
  data?: string,
  id?: string,
  date: date,
  dark: boolean,
}

const DateTimeStacked = (props: DateTimeStackedProps) => {
  const { date, data = {}, dark } = props,
    dataProps = buildDataProps(data)

  return (
    <Flex
        className={globalProps(props)}
        orientation="row"
        vertical="center"
        {...dataProps}
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
            tag="caption"
            time={date}
        />
      </FlexItem>
    </Flex>
  )
}

export default DateTimeStacked
