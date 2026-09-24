import React from 'react'
import classnames from 'classnames'
import { buildCss, buildHtmlProps } from '../../utilities/props'
import { globalProps } from '../../utilities/globalProps'

type DialogBodyProps = {
  children: React.ReactNode | React.ReactNode[] | string,
  padding?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl",
  className?: string,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
} 

// Body component
const DialogBody = (props: DialogBodyProps): React.ReactElement => {
  const { children, className, htmlOptions = {} } = props
  const bodyCSS = buildCss("dialog_body")
  const bodySpacing = globalProps(props)
  const htmlProps = buildHtmlProps(htmlOptions)

  return (
    <div
        {...htmlProps}
        className={classnames(bodyCSS, bodySpacing, className)}
    >
      {children}
    </div>
  )
}

export default DialogBody
