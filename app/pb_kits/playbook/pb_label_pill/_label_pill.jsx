/* @flow */

import React from 'react'
import classnames from 'classnames'

import {
  buildAriaProps,
  buildDataProps,
} from '../utilities/props'

import {
  Caption,
  Pill,
} from '../'

type LabelPillProps = {
  aria?: object,
  className?: String,
  data?: object,
  id?: String,
  label?: String,
  pillValue?: String,
  variant: 'error' | 'info' | 'neutral' | 'primary' | 'success' | 'warning',
}

const LabelPill = ({
  aria = {},
  className,
  data = {},
  id,
  label,
  pillValue,
  variant = 'neutral',
}: LabelPillProps) => {
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const css = classnames([
    'pb_label_pill_kit',
    className,
  ])

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
