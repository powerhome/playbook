import React from 'react'
import classnames from 'classnames'

import { buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'

import Icon from '../pb_icon/_icon'

type ProgressStepItemProps = {
  className?: string,
  data?: { [key: string]: string },
  status?: "complete" | "active" | "inactive" | "hidden",
  children?: React.ReactNode | React.ReactNode[],
  htmlOptions?: {[key: string]: string | number | boolean | Function},
  icon?: string,
}

const ProgressStepItem = (props: ProgressStepItemProps): React.ReactElement => {
  const {
    className,
    data = {},
    status = 'inactive',
    children,
    htmlOptions = {},
    icon = 'check',
  } = props

  const progressStepItem = buildCss('pb_progress_step_item', status)
   const dataProps = buildDataProps(data)
   const htmlProps = buildHtmlProps(htmlOptions)

  return (
    <li 
        {...dataProps}
        {...htmlProps}
        className={classnames(progressStepItem, className)}
    >
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
