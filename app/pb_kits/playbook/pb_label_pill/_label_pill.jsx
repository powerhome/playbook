/* @flow */

import React from 'react'
import classnames from 'classnames'
import { spacing } from '../utilities/spacing.js'

import { buildAriaProps, buildDataProps } from '../utilities/props'

import { Caption, Pill } from '../'

type LabelPillProps = {
  aria?: object,
  className?: String,
  data?: object,
  id?: String,
  label?: String,
  pillValue?: String,
  variant: "error" | "info" | "neutral" | "primary" | "success" | "warning",
}

const LabelPill = (props: LabelPillProps) => {
  const {
    aria = {},
    className,
    data = {},
    id,
    label,
    pillValue,
    variant = 'neutral',
  } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const css = classnames(['pb_label_pill_kit', className], spacing(props))

  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={css}
        id={id}
    >
      <Caption
          className="pb_label_pill_label"
          text={label}
      />

      <Pill
          className="pb_label_pill_pill"
          text={pillValue}
          variant={variant}
      />
    </div>
  )
}

export default LabelPill
