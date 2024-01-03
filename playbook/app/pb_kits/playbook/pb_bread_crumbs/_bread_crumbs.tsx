import React from 'react'
import classnames from 'classnames'
import { globalProps } from '../utilities/globalProps'

import {
  buildAriaProps,
  buildCss,
  buildDataProps,
  buildHtmlProps
} from '../utilities/props'

type BreadCrumbsProps = {
  aria?: {[key: string]: string},
  className?: string,
  data?: {[key: string]: string},
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  text?: string,
  children?: React.ReactChild[] | React.ReactNode,
}
const BreadCrumbs = (props: BreadCrumbsProps): React.ReactElement => {
  const {
    aria = { label: 'Breadcrumb Navigation' },
    className,
    data = {},
    htmlOptions = {},
    id,
    children,
  } = props
  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const css = classnames(
    buildCss('pb_bread_crumbs_kit'),
    globalProps(props),
    className
  )

  return (
    <nav
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
        className={css}
        id={id}
    >
      {children}
    </nav>
  )
}

export default BreadCrumbs
