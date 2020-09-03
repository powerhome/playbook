/* @flow */

import React from 'react'
import classnames from 'classnames'

import DateTime from '../pb_kit/dateTime.js'
import { buildCss } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

import { Body, Icon, Title  } from '../'

type TimeProps = {
  align?: 'left' | 'center' | 'right',
  className?: string | array<string>,
  data?: string,
  date: string,
  id?: string,
  size?: 'lg' | 'sm',
  showIcon?: boolean,
  timeZone?: string,
}

const Time = (props: TimeProps) => {
  const { align, className, date, showIcon, size, timeZone } = props
  const classes = classnames(
    className,
    buildCss('pb_time_kit', align, size),
    globalProps(props)
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
            />
          </Body>
          {' '}
        </If>
        <time dateTime={date}>
          <span>
            <If condition={size !== 'lg'}>
              <Body
                  tag="span"
                  text={dateTimestamp.toTimeWithMeridian()}
              />
              <Else />
              <Title
                  size={3}
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
