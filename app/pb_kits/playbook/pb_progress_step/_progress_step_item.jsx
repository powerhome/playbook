/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'
import { Icon } from '..'

type ProgressStepItemProps = {
  className?: string,
  status?: 'complete' | 'active' | 'inactive',
  children?: React.Node,
}

const ProgressStepItem = ({
  className,
  status = 'inactive',
  children,
}: ProgressStepItemProps) => {
  const progressStepItem = buildCss('pb_progress_step_item', status)

  return (
    <li className={classnames(progressStepItem, className)}>
      <div className="box">
        <div className="circle">
          <Icon
              icon="check"
          />
        </div>
        <div className="content">
          {children}
        </div>
      </div>
    </li>
  )
}
export default ProgressStepItem
