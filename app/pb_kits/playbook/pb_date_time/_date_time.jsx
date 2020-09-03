/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'
import {  Flex, Date as FormattedDate, Time } from '../'

type DateTimeProps = {
  align?: "left" | "center" | "right",
  aria?: object,
  className?: string,
  dark?: boolean,
  data?: object,
  datetime: string,
  id?: string,
  size?: "sm" | "md",
  showDayOfWeek: boolean,
  showIcon?: boolean,
  timeZone?: string
}

const DateTime = (props: DateTimeProps) => {
  const {
    align = 'left',
    aria = {},
    className,
    data = {},
    dark = false,
    showDayOfWeek = false,
    datetime,
    id,
    showIcon = false,
    size = 'sm',
    timeZone = 'America/New_York',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_date_time', size, {
      dark: dark,
    }),
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
      <Flex
          horizontal={align}
          vertical="center"
      >
        <FormattedDate
            datetime={datetime}
            showDayOfWeek={showDayOfWeek}
            timeZone={timeZone}
        />
        <Time
            datetime={datetime}
            marginLeft="md"
            showIcon={showIcon}
            size="sm"
            timeZone={timeZone}
        />
      </Flex>
    </div>
  )
}

export default DateTime
