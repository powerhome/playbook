/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'
import { Icon } from '..'

type ProgressStepItemProps = {
  className?: string,
  status?: "complete" | "active" | "inactive" | "hidden",
  children?: React.Node,
  icon?: string,
}

const ProgressStepItem = ({
  className,
  status = 'inactive',
  children,
  icon = 'check',
}: ProgressStepItemProps) => {
  const progressStepItem = buildCss('pb_progress_step_item', status)

  return (
    <li className={classnames(progressStepItem, className)}>
      <div className="box">
        <div className="circle">
          <Icon icon={icon} />
        </div>
        <div className="content">{children}</div>
      </div>
    </li>
  )
}
export default ProgressStepItem
