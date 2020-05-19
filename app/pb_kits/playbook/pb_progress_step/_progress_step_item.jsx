/* @flow */

import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'
import { Icon } from '..'

type ProgressStepItemProps = {
  className?: String,
  status?: 'complete' | 'active' | 'inactive',
  children?: React.Node,
}

const ProgressStepItem = ({
  className,
  status = 'inactive',
  children,
}: ProgressStepItemProps) => {
  const progressStepItem = buildCss('pb_progress_step_item_kit', status)

  return (
    <div className={classnames(progressStepItem, className)}>
      <div className="pb_progress_step_item_wrapper">
        <div className="pb_progress_step_item_connector_first" />
        <div className="pb_progress_step_item_step_wrapper">
          <div className="pb_progress_step_item_step">
            <div className="pb_progress_step_item_step_connector_first" />
            <div className="pb_progress_step_item_step_circle">
              <Icon
                  fixedWidth
                  icon="check"
              />
            </div>
            <div className="pb_progress_step_item_step_connector_second" />
          </div>
          <div>
            {children}
          </div>
        </div>
        <div className="pb_progress_step_item_connector_second" />
      </div>
    </div>
  )
}
export default ProgressStepItem
