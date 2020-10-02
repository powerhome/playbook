/* @flow */

import React from 'react'
import DateTime from '../pb_kit/dateTime.js'
import { Body, Caption, Icon } from '../'
import classnames from 'classnames'
import { globalProps } from '../utilities/globalProps.js'

type DateRangeInlineProps = {
  className?: string,
  id?: string,
  data?: string,
  align?: "left" | "center" | "vertical",
  size?: "sm" | "xs",
  dark?: boolean,
  icon?: boolean,
  startDate?: date,
  endDate?: date
}

const dateTimestamp = (dateValue, includeYear) => {
  const date = new DateTime({ value: dateValue })
  const year = includeYear ? date.toYear() : ''
  return `${date.toDay()} ${date.toMonth()} ${year}`
}

const dateTimeIso = (dateValue) => {
  const date = new DateTime({ value: dateValue })
  return date.toIso()
}

const DateRangeInline = (props: DateRangeInlineProps) => {
  const {
    icon = false,
    dark = false,
    size = 'sm',
    align = 'left',
    startDate,
    endDate,
  } = props

  const iconContent = () => {
    return (
      <If condition={icon}>
        <Body
            color="light"
            tag="span"
        >
          <Icon
              dark={dark}
              fixedWidth
              icon="calendar-alt"
              size={size}
              tag="span"
          />
        </Body>
      </If>
    )
  }

  const dateInCurrentYear = () => {
    const currentDate = new Date()
    return startDate.getFullYear() == endDate.getFullYear() && startDate.getFullYear() == currentDate.getFullYear()
  }

  const renderTime = (date) => {
    return (
      <time dateTime={dateTimeIso(date)}>
        <Choose>
          <When condition={dateInCurrentYear()}>
            {` ${dateTimestamp(date, false)} `}
          </When>
          <Otherwise>
            {` ${dateTimestamp(date, true)} `}
          </Otherwise>
        </Choose>
      </time>
    )
  }

  return (
    <div className={classnames('pb_date_range_inline_kit_' + align, globalProps(props))}>
      <div className="pb_date_range_inline_wrapper">
        <If condition={size == 'xs'}>
          {iconContent()}
          <Caption
              dark={dark}
              tag="span"
          >
            {renderTime(startDate)}
          </Caption>
          <Caption
              dark={dark}
              tag="span"
          >
            <Icon
                fixedWidth
                icon="long-arrow-right"
            />
          </Caption>
          <Caption
              dark={dark}
              tag="span"
          >
            {renderTime(endDate)}
          </Caption>
        </If>

        <If condition={size == 'sm'}>
          {iconContent()}
          <Body
              dark={dark}
              tag="span"
          >
            {renderTime(startDate)}
          </Body>
          <Body
              color="light"
              dark={dark}
              tag="span"
          >
            <Icon
                dark={dark}
                fixedWidth
                icon="long-arrow-right"
            />
          </Body>
          <Body
              dark={dark}
              tag="span"
          >
            {renderTime(endDate)}
          </Body>
        </If>
      </div>
    </div>
  )
}

export default DateRangeInline
