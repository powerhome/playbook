/* @flow */

import React, { type Node } from 'react'
import classnames from 'classnames'
import { systemProps } from '../utilities/systemProps.js'

type TableProps = {
  children: Array<Node> | Node,
  className: string,
  container: boolean,
  dark: boolean,
  dataTable: boolean,
  disableHover: boolean,
  responsive: "collapse" | "scroll" | "none",
  singleLine: boolean,
  size: "sm" | "md" | "lg",
}

const Table = (props: TableProps) => {
  const {
    children,
    className,
    container = true,
    dark = false,
    dataTable = false,
    disableHover = false,
    responsive = 'collapse',
    singleLine = false,
    size = 'sm',
  } = props

  return (
    <table
        className={classnames(
        className,
        'pb_table',
        `table-${size}`,
        `table-responsive-${responsive}`,
        {
          'table-card': container,
          'table-dark': dark,
          'data_table': dataTable,
          'single-line': singleLine,
          'no-hover': disableHover,
        },
        systemProps(props)
      )}
    >
      {children}
    </table>
  )
}

export default Table
