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
  icon?: Boolean
}

const ProgressStep = ({
  className,
  children,
  orientation = 'horizontal',
  icon = false,
}: ProgressStepProps) => {
  const iconStyle = icon === true ? 'icon' : ''
  const ProgressStepCss = buildCss('pb_progress_step_kit', orientation, iconStyle)

  return (
    <div className={classnames(ProgressStepCss, className)}>
      {children}
    </div>
  )
}

export default ProgressStep
