import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

type ProgressStepProps = {
  aria?: { [key: string]: string },
  className?: string,
  data?: { [key: string]: string },
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  children?: React.ReactChild[] | React.ReactChild,
  orientation?: "horizontal" | "vertical",
  icon?: boolean,
  showIcon?: boolean,
  variant?: string,
  color?: string,
}

const ProgressStep = (props: ProgressStepProps): React.ReactElement => {
  const {
    aria = {},
    className,
    children,
    color,
    data = {},
    orientation = 'horizontal',
    htmlOptions = {},
    icon = false,
    showIcon = false,
    variant,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const iconStyle = icon === true || showIcon === true ? 'icon' : ''
  const progressStepCss = buildCss(
    'pb_progress_step_kit',
    orientation,
    iconStyle,
    variant,
    color,
  )

  return (
    <ul
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={classnames(progressStepCss, globalProps(props), className)}
    >
      {children}
    </ul>
  )
}

export default ProgressStep
