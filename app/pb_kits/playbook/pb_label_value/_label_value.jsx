/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Body, Caption } from '../'

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
} from '../utilities/props'

type LabelValueProps = {
  aria?: object,
  className?: String,
  dark?: Boolean,
  data?: object,
  id?: String,
  label: String,
  value: String,
}

const LabelValue = ({
  aria = {},
  className,
  dark = false,
  data = {},
  id,
  label,
  value,
}: LabelValueProps) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(className, buildCss('pb_label_value_kit', { 'dark': dark }))

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
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
