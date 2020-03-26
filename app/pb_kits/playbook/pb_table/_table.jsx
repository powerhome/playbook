/* @flow */

import React, { type Node } from 'react'
import classnames from 'classnames'

type TableProps = {
  children: Array<Node> | Node,
  className: string,
  container: boolean,
  dark: boolean,
  dataTable: boolean,
  // @deprecated disable_hover since version 3.2.0, please use `disableHover`
  disable_hover: boolean, // eslint-disable-line camelcase
  disableHover: boolean,
  responsive: "collapse" | "scroll" | "none",
  // @deprecated single_line since version 3.2.0, please use `singleLine`
  single_line: boolean, // eslint-disable-line camelcase
  singleLine: boolean,
  size: "sm" | "md" | "lg",
}

const Table = ({
  children,
  className,
  container = true,
  dark = false,
  dataTable = false,
  disable_hover = false, // eslint-disable-line camelcase
  disableHover = false,
  responsive = 'collapse',
  single_line = false, // eslint-disable-line camelcase
  singleLine = false,
  size = 'sm',
}: TableProps) => {
  disableHover = disableHover || disable_hover // eslint-disable-line camelcase
  singleLine = singleLine || single_line // eslint-disable-line camelcase

  const classes = classnames(className, 'pb_table', `table-${size}`, `table-responsive-${responsive}`, {
    'table-card': container,
    'table-dark': dark,
    'data_table': dataTable,
    'single-line': singleLine,
    'no-hover': disableHover,
  })

  return (
    <table className={classes}>
      {children}
    </table>
  )
}

export default Table
