/* @flow */

import React from 'react'
import classnames from 'classnames'

import { buildCss } from '../utilities/props'
import DateTime from '../pb_kit/dateTime.js'

import {
  Body,
  Icon,
  Title,
} from '../'

type DateRangeStackedProps = {
  className?: String | Array<String>,
  data?: String,
  dark?: Boolean,
  endDate: String,
  id?: String,
  startDate: String
}

const DateRangeStacked = ({
  className,
  dark = false,
  endDate,
  startDate,
}: DateRangeStackedProps) => {
  const startDateTimestamp = new DateTime({ value: startDate })
  const endDateTimestamp = new DateTime({ value: endDate })
  const css = classnames(className, buildCss('pb_date_range_stacked'))

  return (
    <div className={css}>
      <div className="pb_date_range_stacked_display">
        <Title
            dark={dark}
            size={4}
            text={`${startDateTimestamp.toDay()} ${startDateTimestamp.toMonth().toUpperCase()}`}
        />
        <Body
            className="pb_date_range_stacked_start_date"
            color="light"
        >
          { startDateTimestamp.toYear() }
        </Body>
      </div>

      &nbsp;

      <div className="pb_date_range_stacked_display">
        <Body
            color="light"
            tag="span"
        >
          <Icon
              className="pb_date_range_stacked_arrow"
              fixedWidth
              icon="long-arrow-right"
          />
        </Body>
      </div>

      &nbsp;

      <div className="pb_date_range_stacked_display">
        <Title
            dark={dark}
            size={4}
            text={`${endDateTimestamp.toDay()} ${endDateTimestamp.toMonth().toUpperCase()}`}
        />
        <Body color="light">{ endDateTimestamp.toYear() }</Body>
      </div>
    </div>
  )
}

export default DateRangeStacked
