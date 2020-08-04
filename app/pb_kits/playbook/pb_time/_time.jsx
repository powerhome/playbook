/* @flow */

import React from 'react'
import classnames from 'classnames'

import DateTime from '../pb_kit/dateTime.js'
import { buildCss } from '../utilities/props'
import { spacing } from '../utilities/spacing.js'

import { Body, Icon, Title  } from '../'

type TimeProps = {
  align?: 'left" | "center' | 'right',
  className?: String | Array<String>,
  dark?: Boolean,
  data?: String,
  date: String,
  id?: String,
  showIcon?: Boolean,
  showTimezone?: Boolean,
  size?: 'lg' | 'sm' | 'xs',
}

const Time = (props: TimeProps) => {
  const { align, className, dark = false, date, showIcon, showTimezone, size } = props
  const classes = classnames(
    className,
    buildCss('pb_time_kit', align, size, {
      dark: dark,
    }),
    spacing(props)
  )

  const dateTimestamp = new DateTime({ value: date })

  return (
    <div className={classes}>
      <div className="pb_time">
        { showIcon && <Icon
            fixedWidth
            icon="clock"
                      /> }

        <time dateTime={date}>
          <If condition={size !== 'lg'}>
            <Body
                size={3}
                tag="span"
                text={dateTimestamp.toTimeWithMeridian()}
            />
          </If>
          <If condition={size === 'lg'}>
            <Title
                color="light"
                size={3}
                tag="span"
                text={dateTimestamp.toTimeWithMeridian()}
            />
          </If>
        </time>
        { showTimezone && <span className="pb_time_timezone">{dateTimestamp.toTimezone()}</span> }
      </div>
    </div>
  )
}

export default Time
