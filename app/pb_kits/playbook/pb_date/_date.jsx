/* @flow */

import React from 'react'
import DateTime from '../pb_kit/dateTime.js'
import { Body, Icon, Title } from '../'
import classnames from 'classnames'
import { globalProps } from '../utilities/globalProps.js'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'

type PbDateProps = {
  aria: Object,
  date: string | date,
  className?: string,
  data?: Object,
  id?: string,
  showIcon?: boolean,
  showDayOfWeek?: boolean,
  alignment?: "left" | "center" | "right",
  timeZone?: string,
}

const PbDate = (props: PbDateProps) => {
  const {
    aria = {},
    alignment = 'left',
    className,
    date,
    data = {},
    id,
    showDayOfWeek = false,
    showIcon = false,
    timeZone,
  } = props

  const dateTimestamp = new DateTime({ value: date, zone: timeZone })
  const weekday = dateTimestamp.toWeekday()
  const month = dateTimestamp.toMonth()
  const day = dateTimestamp.toDay()
  const year = dateTimestamp.toYear()
  const currentYear = new Date().getFullYear().toString()

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  const classes = classnames(
    className,
    buildCss('pb_date_kit', alignment),
    globalProps(props)
  )
  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <Title
          size={4}
          tag="h4"
      >
        <If condition={showIcon}>
          <Body
              color="light"
              tag="span"
          >
            <Icon
                fixedWidth
                icon="calendar-alt"
            />
          </Body>
        </If>
        <If condition={showDayOfWeek}>
          {weekday}
          <Body
              color="light"
              tag="span"
              text=" • "
          />
        </If>
        <span>
          {month}
          {' '}
          {day}
        </span>
        <If condition={currentYear != year}>
          <span>
            {`, ${year}`}
          </span>
        </If>
      </Title>
    </div>
  )
}

export default PbDate
