/* @flow */
import React from 'react'
import classnames from 'classnames'
import { buildCss } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

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
    <tr className={classnames(tableRowCss, className, globalProps(props))}>
      {children}
    </tr>
  )
}

export default TableRow
