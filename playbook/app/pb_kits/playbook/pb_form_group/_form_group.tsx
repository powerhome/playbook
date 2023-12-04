import React, { ReactNode } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

type FormGroupProps = {
  aria?: {[key: string]: string},
  children?: ReactNode,
  className?: string,
  data?: unknown,
  fullWidth?: boolean,
  id?: string,
}

const FormGroup = (props: FormGroupProps) => {
  const {
    aria = {},
    className,
    data = {},
    fullWidth = false,
    id,
    children,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const classes = classnames(buildCss('pb_form_group_kit', { full: fullWidth }), globalProps(props), className)
  return (
    <div
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      {children}
    </div>
  )
}

export default FormGroup
