/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildDataProps } from '../utilities/props'
import { Body, Caption } from '../'
import { globalProps } from '../utilities/globalProps.js'

type LabelValueProps = {
  aria?: object,
  className?: String,
  dark?: Boolean,
  data?: object,
  id?: String,
  label: String,
  value: String,
}

const LabelValue = (props: LabelValueProps) => {
  const {
    aria = {},
    className,
    dark = false,
    data = {},
    id,
    label,
    value } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const themeStyle = dark === true ? '_dark' : ''
  const css = classnames(
    ['pb_label_value_kit' + themeStyle, className],
    globalProps(props)
  )

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={css}
        id={id}
    >
      <Caption text={label} />
      <Body text={value} />
    </div>
  )
}

export default LabelValue
