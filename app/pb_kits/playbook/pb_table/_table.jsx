/* @flow */

import React, { type Node } from 'react'
import classnames from 'classnames'

type TableProps = {
  children: Array<Node> | Node,
  className: string,
  container: boolean,
  dark: boolean,
  disableHover: boolean,
  singleLine: boolean,
  size: "sm" | "md" | "lg",
}

const Table = ({
  children,
  className,
  container = true,
  dark = false,
  disableHover = false,
  singleLine = false,
  size = 'sm',
}: TableProps) => {
  const tableClasses = classnames(className, 'pb_table', `table-${size}`, {
    'table-card': container,
    'table-dark': dark,
    'single-line': singleLine,
    'no-hover': disableHover,
  })

  return (
    <table className={tableClasses}>
      {children}
    </table>
  )
}

export default Table
