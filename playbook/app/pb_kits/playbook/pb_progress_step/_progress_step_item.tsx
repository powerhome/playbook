import React from 'react'
import classnames from 'classnames'

import { buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'
import { GlobalEventProps, globalEventProps } from '../utilities/globalEventProps'

import Icon from '../pb_icon/_icon'

type ProgressStepItemProps = {
  className?: string,
  data?: { [key: string]: string },
  status?: "complete" | "active" | "inactive" | "hidden",
  children?: React.ReactNode | React.ReactNode[],
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  icon?: string,
} & GlobalEventProps

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
        {...globalEventProps(props)}
        className={classnames(progressStepItem, globalProps(props), className)}
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
