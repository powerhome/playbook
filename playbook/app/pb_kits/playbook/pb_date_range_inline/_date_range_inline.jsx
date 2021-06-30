/* @flow */

import React from 'react'
import classnames from 'classnames'

import { globalProps } from '../utilities/globalProps'
import { buildCss } from '../utilities/props'
import DateTime from '../pb_kit/dateTime'

import Body from '../pb_body/_body'
import Caption from '../pb_caption/_caption'
import Icon from '../pb_icon/_icon'

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
  if (includeYear) {
    return `${date.toMonth()} ${date.toDay()}, ${date.toYear()}`
  } else {
    return `${date.toMonth()} ${date.toDay()}`
  }
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
    className,
  } = props

  const iconContent = () => {
    return (
      <If condition={icon}>
        <Body
            color="light"
            key={Math.random()}
            tag="span"
        >
          <Icon
              className="pb_date_range_inline_icon"
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

  const dateRangeClasses =  buildCss('pb_date_range_inline_kit', align)

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
    <div className={classnames(dateRangeClasses, globalProps(props), className)}>
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
                className="pb_date_range_inline_arrow"
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
                className="pb_date_range_inline_arrow"
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
