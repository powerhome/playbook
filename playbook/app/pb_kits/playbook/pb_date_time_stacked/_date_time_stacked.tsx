
import React from 'react'

import { buildCss, buildHtmlProps } from '../utilities/props'
import { deprecatedProps, globalProps } from '../utilities/globalProps'

import Flex from '../pb_flex/_flex'
import FlexItem from '../pb_flex/_flex_item'
import SectionSeparator from '../pb_section_separator/_section_separator'
import TimeStacked from '../pb_time_stacked/_time_stacked'
import DateStacked from '../pb_date_stacked/_date_stacked'

type DateTimeStackedProps = {
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  date: Date,
  datetime: Date,
  dark: boolean,
  timeZone?: string,
  showCurrentYear?: boolean,
}

const DateTimeStacked = (props: DateTimeStackedProps): React.ReactElement => {
  if (props.date) deprecatedProps()

  const {
    date,
    datetime,
    dark,
    htmlOptions = {},
    timeZone = 'America/New_York',
    showCurrentYear = false,
  } = props

  const classes = buildCss('pb_date_time_stacked_kit', globalProps(props))
  const htmlProps = buildHtmlProps(htmlOptions)

  return (
    <Flex
        inline={false}
        vertical="stretch"
        {...htmlProps}
        {...props}
    >
      <FlexItem>
        <DateStacked
            align="right"
            bold
            dark={dark}
            date={date || datetime}
            showCurrentYear={showCurrentYear}
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
            timeZone={timeZone}
        />
      </FlexItem>
    </Flex>
  )
}

export default DateTimeStacked
