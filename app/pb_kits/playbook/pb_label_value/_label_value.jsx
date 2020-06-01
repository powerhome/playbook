/* @flow */

import React from 'react'
import classnames from 'classnames'
import { Body, Caption } from '../'
import { spacing } from '../utilities/spacing.js'

type LabelValueProps = {
  className?: String,
  label: String,
  value: String,
  dark?: Boolean,
}

const LabelValue = (props: LabelValueProps) => {
  const { className, label, value, dark = false } = props
  const themeStyle = dark === true ? '_dark' : ''
  const css = classnames(
    ['pb_label_value_kit' + themeStyle, className],
    spacing(props)
  )

  return (
    <div className={css}>
      <Caption text={label} />
      <Body text={value} />
    </div>
  )
}

export default LabelValue
