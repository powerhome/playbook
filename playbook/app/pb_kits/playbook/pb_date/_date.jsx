/* @flow */

import React from 'react'
import classnames from 'classnames'

import DateTime from '../pb_kit/dateTime'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Body from '../pb_body/_body'
import Caption from '../pb_caption/_caption'
import Icon from '../pb_icon/_icon'
import Title from '../pb_title/_title'

type PbDateProps = {
  alignment?: "left" | "center" | "right",
  aria: Object,
  className?: string,
  data?: Object,
  id?: string,
  showDayOfWeek?: boolean,
  showIcon?: boolean,
  size?: string,
  value: string | date,
}

const PbDate = (props: PbDateProps) => {
  const {
    aria = {},
    alignment = 'left',
    className,
    data = {},
    id,
    showDayOfWeek = false,
    showIcon = false,
    size = 'md',
    value,
  } = props

  const dateTimestamp = new DateTime({ value: value })
  const weekday = dateTimestamp.toWeekday()
  const month = dateTimestamp.toMonth()
  const day = dateTimestamp.toDay()
  const year = dateTimestamp.toYear()
  const currentYear = new Date().getFullYear().toString()

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  const classes = classnames(
    buildCss('pb_date_kit', alignment),
    globalProps(props),
    className
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      <If condition={size == 'md' || size == 'lg'}>

        <Title
            size={4}
            tag="h4"
        >
          <If condition={showIcon}>
            <Body
                className="pb_icon_kit_container"
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
        <Else />
        <>
          <If condition={showIcon}>
            <Caption
                className="pb_icon_kit_container"
                tag="span"
            >
              <Icon
                  fixedWidth
                  icon="calendar-alt"
                  size="xs"
              />
            </Caption>
          </If>
          <If condition={showDayOfWeek}>
            <Caption tag="div">
              {weekday}
            </Caption>
            <Caption
                color="light"
                tag="div"
                text=" • "
            />
          </If>
          <Caption tag="span">
            {month}
            {' '}
            {day}
            <If condition={currentYear != year}>
              {`, ${year}`}
            </If>
          </Caption>
        </>
      </If>
    </div>
  )
}

export default PbDate
