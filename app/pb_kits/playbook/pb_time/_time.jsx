/* @flow */

import React from 'react'
import classnames from 'classnames'

import DateTime from '../pb_kit/dateTime.js'
import { buildCss } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

import { Body, Icon, Title  } from '../'

type TimeProps = {
  align?: 'left" | "center' | 'right',
  className?: String | Array<String>,
  data?: String,
  date: String,
  id?: String,
  showTimezone?: Boolean,
  size?: 'lg' | 'sm' | 'xs',
}

const Time = (props: TimeProps) => {
  const { align, className, date, showTimezone, size } = props
  const classes = classnames(
    className,
    buildCss('pb_time_kit', align, size),
    globalProps(props)
  )

  const dateTimestamp = new DateTime({ value: date })

  return (
    <div className={classes}>
      <span className="pb_body_kit">
        <If condition={size === 'sm'}>
          <Icon
              fixedWidth
              icon="clock"
          />
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
            { showTimezone && <span className="pb_time_timezone">{dateTimestamp.toTimezone()}</span> }
          </span>
        </time>
      </span>
    </div>
  )
}

export default Time
