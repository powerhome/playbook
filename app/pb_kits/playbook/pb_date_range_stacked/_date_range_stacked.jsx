/* @flow */
/*eslint-disable react/no-multi-comp, flowtype/space-before-type-colon */

import React from 'react'
import classnames from 'classnames'

import DateTime from '../pb_kit/dateTime.js'

import {
  Body,
  Title,
  Icon,
} from '../'


type DateRangeStackedProps = {
  className?: String,
  data?: String,
  id?: String,
  start_date?: Date | String,
  end_date?: Date | String,
  dark?: Boolean,
}


const kitClasses = ({dark='false'}: DateRangeStackedProps) => {
  let classname = 'pb_date_range_stacked'
  classname += `_${dark}`
  return classname
}

const DateRangeStacked = ({
  className,
  data,
  id,
  start_date,
  end_date,
  dark = false
}: DateRangeStackedProps) => {

  const start_date_timestamp = new DateTime({ value: start_date })
  const end_date_timestamp = new DateTime({ value: end_date })

  const css = classnames(kitClasses({dark}), className)

  return (
    <div class={css}>
      <div class='pb_date_range_stacked_start_date_wrapper'>
        <Title
          size={4}
          dark={dark}
          text={`${start_date_timestamp.toDay()} ${start_date_timestamp.toMonth().toUpperCase()}`}
          />
        <Body tag="div" color="light" dark={dark}>
          <time datetime={start_date_timestamp.toIso()}>{start_date_timestamp.toYear()}</time>
        </Body>
      </div>

      <div class='pb_date_range_stacked_icon_wrapper'>
        <Body tag="div" color="light" dark={dark}>
          <Icon icon="long-arrow-right" fixedWidth="true" />
        </Body>
      </div>

      <div>
        <Title
          size={4}
          dark={dark}
          text={`${end_date_timestamp.toDay()} ${end_date_timestamp.toMonth().toUpperCase()}`}
          />
        <Body tag="div" color="light" dark={dark}>
          <time datetime={end_date_timestamp.toIso()}>{end_date_timestamp.toYear()}</time>
        </Body>
      </div>
    </div>
  )
}


export default DateRangeStacked
