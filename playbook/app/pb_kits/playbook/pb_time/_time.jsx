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
  showTimezone?: boolean,
  timeZone?: string,
}

const Time = (props: TimeProps) => {
  const { align, className, date, showIcon, size, timeZone, showTimezone = true } = props
  const classes = classnames(
    buildCss('pb_time_kit', align, size),
    globalProps(props),
    className
  )

  const dateTimestamp = new DateTime({ value: date, zone: timeZone })

  return (
    <div className={classes}>
      <If condition={showIcon}>
        <Body
            color="light"
            tag="span"
        >
          <Icon
              fixedWidth
              icon="clock"
              size={size === 'md' ? '' : 'sm'}
          />
        </Body>
        {' '}
      </If>

      <time dateTime={date}>
        <span>
          <If condition={size === 'md'}>
            <Body
                className="pb_time"
                tag="span"
                text={dateTimestamp.toTimeWithMeridian()}
            />
            {' '}
            <If condition={showTimezone}>
              <Body
                  color="light"
                  tag="span"
                  text={dateTimestamp.toTimezone()}
              />
            </If>
            <Else />
            <Caption
                color="light"
                tag="span"
                text={dateTimestamp.toTimeWithMeridian()}
            />
            {' '}
            <If condition={showTimezone}>
              <Caption
                  color="light"
                  tag="span"
                  text={dateTimestamp.toTimezone()}
              />
            </If>
          </If>
        </span>
      </time>
    </div>
  )
}

export default Time
