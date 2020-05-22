/* @flow */

import React from 'react'
import classnames from 'classnames'

import {
  Caption,
} from '../'

import {
  buildCss,
  buildDataProps,
} from '../utilities/props'

type TimestampProps = {
  id?: String,
  data?: object,
  className?: String,
  text?: String,
}

const Timestamp = ({
  id,
  className,
  data = {},
  text,
}: TimestampProps) => {
  const dataProps = buildDataProps(data)
  const pbCss = buildCss('pb_timestamp_kit')

  return (
    <div
        {...dataProps}
        className={classnames(className, pbCss)}
        id={id}
    >
      <Caption
          size="xs"
          tag="span"
          text={text}
      />
    </div>
  )
}

export default Timestamp
