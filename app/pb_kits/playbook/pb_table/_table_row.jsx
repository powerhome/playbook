/* @flow */
import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'
import { spacing } from '../utilities/spacing.js'

type TableRowPropTypes = {
  children: Array<React.ReactNode> | React.ReactNode,
  className: String,
  sideHighlightColor: String,
}

const TableRow = (props: TableRowPropTypes) => {
  const { children, className, sideHighlightColor = 'windows' } = props
  const sideHighlightClass =
    sideHighlightColor != '' ? `side_highlight_${sideHighlightColor}` : null
  const tableRowCss = buildCss('pb_table_row_kit', sideHighlightClass)

  return (
    <tr className={classnames(tableRowCss, className, spacing(props))}>
      {children}
    </tr>
  )
}

export default TableRow
