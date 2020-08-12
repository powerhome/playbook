/* @flow */
import React from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildCss, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type TableRowPropTypes = {
  aria?: object,
  children: array<React.ReactNode> | React.ReactNode,
  className: string,
  data?: object,
  id?: string,
  sideHighlightColor: string,
}

const TableRow = (props: TableRowPropTypes) => {
  const {
    aria = {},
    children,
    className,
    data = {},
    id,
    sideHighlightColor = 'windows',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const sideHighlightClass =
    sideHighlightColor != '' ? `side_highlight_${sideHighlightColor}` : null
  const classes = classnames(buildCss('pb_table_row_kit', sideHighlightClass), className, globalProps(props))

  return (
    <tr
        {...ariaProps}
        {...dataProps}
        className={classes}
        id={id}
    >
      {children}
    </tr>
  )
}

export default TableRow
