/* @flow */
import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'

type TableRowPropTypes = {
  children: Array<React.ReactNode> | React.ReactNode,
  className: String,
  sideHighlightColor: String,
}

const TableRow = ({
  children,
  className,
  sideHighlightColor = 'windows',
}: TableRowPropTypes) => {
  const sideHighlightClass = sideHighlightColor != '' ? `side_highlight_${sideHighlightColor}` : null
  const tableRowCss = buildCss('pb_table_row_kit', sideHighlightClass)

  return (
    <tr className={classnames(tableRowCss, className)}>
      {children}
    </tr>
  )
}

export default TableRow
