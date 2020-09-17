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
  variant?: string,
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
    <ul className={classnames(progressStepCss, globalProps(props), className)}>
      {children}
    </ul>
  )
}

export default ProgressStep
