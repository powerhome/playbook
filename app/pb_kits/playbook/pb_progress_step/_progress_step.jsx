/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type ProgressStepProps = {
  className?: String,
  data?: String,
  id?: String,
  children?: array<React.ReactChild>,
  orientation?: "horizontal" | "vertical",
  icon?: Boolean,
  variant?: String,
}

const ProgressStep = (props: ProgressStepProps) => {
  const {
    className,
    children,
    orientation = 'horizontal',
    icon = false,
    variant,
  } = props
  const iconStyle = icon === true ? 'icon' : ''
  const progressStepCss = buildCss(
    'pb_progress_step_kit',
    orientation,
    iconStyle,
    variant,
  )

  return (
    <ul className={classnames(progressStepCss, className, globalProps(props))}>
      {children}
    </ul>
  )
}

export default ProgressStep
