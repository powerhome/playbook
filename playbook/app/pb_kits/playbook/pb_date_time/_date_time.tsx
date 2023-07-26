import React from 'react'
import classnames from 'classnames'

import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

import Flex from '../pb_flex/_flex'
import Time from '../pb_time/_time'
import FormattedDate from '../pb_date/_date'

type DateTimeProps = {
  align?: "left" | "center" | "right",
  aria?: { [key: string]: string; },
  className?: string,
  data?: { [key: string]: string; },
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
    showDayOfWeek = false,
    datetime,
    id,
    showIcon = false,
    size = 'md',
    timeZone = 'America/New_York',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(
    buildCss('pb_date_time', size),
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
          vertical="baseline"
      >
        <FormattedDate
            showDayOfWeek={showDayOfWeek}
            size={size}
            value={datetime}
        />
        <Time
            date={datetime}
            marginLeft="sm"
            showIcon={showIcon}
            size={size}
            timeZone={timeZone}
        />
      </Flex>
    </div>
  )
}

export default DateTime
