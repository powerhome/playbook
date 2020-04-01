/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Body, Caption } from '../'

type LabelValueProps = {
  className?: String,
  label: String,
  value: String,
  dark?: Boolean
}

const LabelValue = ({
  className,
  label,
  value,
  dark = false,
}: LabelValueProps) => {
  const themeStyle = dark === true ? '_dark' : ''
  const css = classnames([
    'pb_label_value_kit' + themeStyle,
    className,
  ])

  return (
    <div className={css}>
      <Caption
          text={label}
      />
      <Body
          text={value}
      />
    </div>
  )
}

export default LabelValue
