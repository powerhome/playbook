import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'

type TableRowPropTypes = {
  aria?: { [key: string]: string },
  children: React.ReactNode[] | React.ReactNode,
  className: string,
  data?: { [key: string]: string },
  htmlOptions?: {[key: string]: string | number | boolean | Function},
  id?: string,
  sideHighlightColor: string,
}

const TableRow = (props: TableRowPropTypes) => {
  const {
    aria = {},
    children,
    className,
    data = {},
    htmlOptions = {},
    id,
    sideHighlightColor = 'windows',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const sideHighlightClass =
    sideHighlightColor != '' ? `side_highlight_${sideHighlightColor}` : null
  const classes = classnames(buildCss('pb_table_row_kit', sideHighlightClass), globalProps(props), className)

  return (
    <tr
      {...ariaProps}
      {...dataProps}
      {...htmlProps}
      className={classes}
      id={id}
    >
      {children}
    </tr>
  )
}

export default TableRow
