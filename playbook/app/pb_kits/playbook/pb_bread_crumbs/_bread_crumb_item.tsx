import React from "react"
import classnames from "classnames"
import { globalProps, domSafeProps } from "../utilities/globalProps"

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
  buildHtmlProps,
} from "../utilities/props"

type BreadCrumbItemProps = {
  aria?: { [key: string]: string }
  children?: React.ReactNode
  className?: string
  component?: "a" | "span"
  data?: { [key: string]: string }
  htmlOptions?: { [key: string]: string | number | boolean | (() => void) }
  id?: string
  [x: string]: any
}

const BreadCrumbItem = (props: BreadCrumbItemProps): React.ReactElement => {
  const {
    aria = {},
    children,
    className,
    component = "a",
    data = {},
    htmlOptions = {},
    id,
    ...rest
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const Component = component || "span"
  const css = classnames(
    buildCss("pb_bread_crumb_item_kit"),
    globalProps(props),
    className
  )

  const processedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement<{ className?: string }>(child)) {
      return React.cloneElement(child, {
        className: classnames(child.props.className, globalProps(props)),
      })
    }
    return child
  })

  return (
    <div {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={css}
        id={id}
    >
      <Component
          className={classnames("pb_bread_crumb_item", globalProps(props))}
          {...domSafeProps(rest)}
      >
        {processedChildren}
      </Component>
    </div>
  )
}
export default BreadCrumbItem
