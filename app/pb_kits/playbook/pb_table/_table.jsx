/* @flow */

import React, { type Node } from 'react'
import classnames from 'classnames'

type TableProps = {
  children: Array<Node> | Node,
  className: string,
  container: boolean,
  dark: boolean,
  // @deprecated disable_hover since version 3.2.0, please use `disableHover`
  disable_hover: boolean, // eslint-disable-line camelcase
  disableHover: boolean,
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
  disable_hover = false, // eslint-disable-line camelcase
  disableHover = false,
  single_line = false, // eslint-disable-line camelcase
  singleLine = false,
  size = 'sm',
}: TableProps) => {
  disableHover = disableHover || disable_hover // eslint-disable-line camelcase
  singleLine = singleLine || single_line // eslint-disable-line camelcase

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
