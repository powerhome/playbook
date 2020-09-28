/* @flow */

import React from 'react'
import classnames from 'classnames'

import DateTime from '../pb_kit/dateTime.js'
import { buildCss } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

import { Body, Caption, Icon } from '../'

type TimeProps = {
  align?: 'left' | 'center' | 'right',
  className?: string | array<string>,
  data?: string,
  date: string,
  dark?: boolean,
  id?: string,
  showIcon?: boolean,
  size?: 'md' | 'sm',
  timeZone?: string,
}

const Time = (props: TimeProps) => {
  const { align, className, date, showIcon, size, timeZone } = props
  const classes = classnames(
    buildCss('pb_time_kit', align, size),
    globalProps(props),
    className
  )

  const dateTimestamp = new DateTime({ value: date, zone: timeZone })

  return (
    <div className={classes}>
      <span className="pb_body_kit">
        <If condition={showIcon}>
          <Body
              color="light"
              tag="span"
          >
            <Icon
                fixedWidth
                icon="clock"
                size={size === 'md' ? 'lg' : 'sm'}
            />
          </Body>
          {' '}
        </If>
        <time dateTime={date}>
          <span>
            <If condition={size !== 'md'}>
              <Body
                  color="light"
                  tag="span"
                  text={dateTimestamp.toTimeWithMeridian()}
              />
              <Else />
              <Caption
                  size="lg"
                  tag="span"
                  text={dateTimestamp.toTimeWithMeridian()}
              />
            </If>
            <If condition={timeZone !== undefined}>
              <span className="pb_time_timezone">{dateTimestamp.toTimezone()}</span>
            </If>
          </span>
        </time>
      </span>
    </div>
  )
}

export default Time
