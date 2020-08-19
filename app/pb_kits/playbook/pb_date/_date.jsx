/* @flow */

import React from 'react'
import DateTime from '../pb_kit/dateTime.js'
import { Body, Icon, Title } from '../'
import classnames from 'classnames'
import { globalProps } from '../utilities/globalProps.js'
import { buildCss } from '../utilities/props'

type PbDateProps = {
  size?: "sm" | "lg",
  date: string | date,
  className?: string,
  icon?: boolean,
  dayOfWeek?: boolean,
  alignment?: "left" | "center" | "right"
}

const PbDate = (props: PbDateProps) => {
  const {
    size = 'sm',
    date,
    className,
    icon = false,
    dayOfWeek = false,
    alignment = 'left',
  } = props

  const dateBreakdown = new DateTime({ value: date })
  const weekday = dateBreakdown.toWeekday()
  const month = dateBreakdown.toMonth()
  const day = dateBreakdown.toDay()
  const year = dateBreakdown.toYear()
  const currentYear = new Date().getFullYear().toString()

  const classes = classnames(
    className,
    buildCss('pb_date_kit', alignment),
    globalProps(props)
  )

  if (size == 'lg')
    return (
      <div className={classes}>
        <If condition={dayOfWeek}>
          <Title
              tag="div"
              text={weekday}
          />
          <Body
              color="light"
              text="•"
          />
        </If>
        <If condition={currentYear != year}>
          <Title
              tag="div"
          >
            {`
              ${month}
              ${day}
              ,
              ${year}
            `}
          </Title>
          <Else />

          <Title
              tag="div"
          >
            {month}
            {day}
          </Title>
        </If>
      </div>
    )
  return (
    <div className={classes}>
      <If condition={icon}>
        <Body color="light">
          <Icon
              fixedWidth
              icon="calendar-alt"
          />
        </Body>
      </If>
      <If condition={dayOfWeek}>
        <Title
            size={4}
            tag="div"
        >
          {weekday}
        </Title>
        <Body
            color="light"
            text="•"
        />
      </If>
      <If condition={currentYear != year}>
        <Title
            size={4}
            tag="div"
        >
          {`
            ${month}
            ${day}
            ,
            ${year}
          `}
        </Title>
        <Else />
        <Title
            size={4}
            tag="div"
        >
          {month}
          {day}
        </Title>
      </If>
    </div>
  )
}

export default PbDate
