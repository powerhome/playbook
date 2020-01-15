/* @flow */

import React from 'react'
import classnames from 'classnames'

import { buildCss } from '../utilities/props'

import {
  Body,
  DateYearStacked,
  Icon,
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
  const css = classnames(className, buildCss('pb_date_range_stacked'))

  return (
    <div className={css}>
      <div className="pb_date_range_stacked_display pb_date_range_stacked_start_date">
        <DateYearStacked
            dark={dark}
            date={startDate}
        />
      </div>
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
      <div className="pb_date_range_stacked_display">
        <DateYearStacked
            dark={dark}
            date={endDate}
        />
      </div>
    </div>
  )
}

export default DateRangeStacked
