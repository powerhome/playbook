/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'

type ProgressStepProps = {
  className?: String,
  data?: String,
  id?: String,
  children?: Array<React.ReactChild>,
  orientation?: 'horizontal' | 'vertical',
  icon?: Boolean,
  dark?: Boolean,
}

const ProgressStep = ({
  className,
  children,
  orientation = 'horizontal',
  icon = false,
  dark = false,
}: ProgressStepProps) => {
  const iconStyle = icon === true ? 'icon' : ''
  const darkStyle = dark === true ? 'dark' : ''
  const progressStepCss = buildCss('pb_progress_step_kit', orientation, iconStyle, darkStyle)

  return (
    <div className={classnames(progressStepCss, className)}>
      {children}
    </div>
  )
}

export default ProgressStep
