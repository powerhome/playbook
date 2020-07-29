/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'
import { systemProps } from '../utilities/systemProps.js'

type ProgressStepProps = {
  className?: String,
  data?: String,
  id?: String,
  children?: Array<React.ReactChild>,
  orientation?: "horizontal" | "vertical",
  icon?: Boolean,
  dark?: Boolean,
}

const ProgressStep = (props: ProgressStepProps) => {
  const {
    className,
    children,
    orientation = 'horizontal',
    icon = false,
    dark = false,
  } = props
  const iconStyle = icon === true ? 'icon' : ''
  const darkStyle = dark === true ? 'dark' : ''
  const progressStepCss = buildCss(
    'pb_progress_step_kit',
    orientation,
    iconStyle,
    darkStyle
  )

  return (
    <div className={classnames(progressStepCss, className, systemProps(props))}>
      {children}
    </div>
  )
}

export default ProgressStep
