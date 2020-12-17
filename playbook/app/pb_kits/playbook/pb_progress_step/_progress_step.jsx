/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type ProgressStepProps = {
  className?: string,
  data?: string,
  id?: string,
  children?: array<React.ReactChild>,
  orientation?: "horizontal" | "vertical",
  icon?: boolean,
  showIcon?: boolean,
  variant?: string,
  color?: string,
}

const ProgressStep = (props: ProgressStepProps) => {
  const {
    className,
    children,
    color,
    orientation = 'horizontal',
    icon = false,
    showIcon = false,
    variant,
  } = props
  const iconStyle = icon === true || showIcon === true ? 'icon' : ''
  const progressStepCss = buildCss(
    'pb_progress_step_kit',
    orientation,
    iconStyle,
    variant,
    color,
  )

  return (
    <ul className={classnames(progressStepCss, globalProps(props), className)}>
      {children}
    </ul>
  )
}

export default ProgressStep
