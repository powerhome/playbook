/* @flow */

import React from 'react'
import classnames from 'classnames'

import DateTime from '../pb_kit/dateTime.js'
import { buildCss } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

import { Body, Caption, Flex, FlexItem } from '../'

type TimeStackedProps = {
  align?: 'left' | 'center' | 'right',
  className?: string | array<string>,
  dark?: boolean,
  data?: string,
  date: string,
  id?: string,
  timeZone?: string,
}

const TimeStackedDefault = (props: TimeStackedProps) => {
  const { align, className, date, timeZone } = props
  const classes = classnames(
    buildCss('pb_time_stacked_kit', align),
    globalProps(props),
    className
  )

  const dateTimestamp = new DateTime({ value: date, zone: timeZone })

  return (
    <div className={classes}>
      <Flex
          orientation="column"
          vertical="left"
      >
        <div align={align}>
          <FlexItem className="time-spacing">
            <Body
                color="light"
                tag="span"
                text={dateTimestamp.toTimeWithMeridian()}
            />
          </FlexItem>
          <FlexItem>
            <Caption
                color="light"
                tag="span"
                text={dateTimestamp.toTimezone()}
            />
          </FlexItem>
        </div>
      </Flex>
    </div>
  )
}

export default TimeStackedDefault
