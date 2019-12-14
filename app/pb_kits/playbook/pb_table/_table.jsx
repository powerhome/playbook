/* @flow */

import React, { type Node } from 'react'
import classnames from 'classnames'

type TableProps = {
  children: Array<Node> | Node,
  className: string,
  container: boolean,
  dark: boolean,
  disable_hover: boolean,
  single_line: boolean,
  size: "sm" | "md" | "lg"
};

const Table = ({
  children,
  className,
  container = true,
  dark = false,
  disable_hover = false,
  single_line = false,
  size = 'sm',
}: TableProps) => {
  const css = classnames([
    'pb_table',
    `table-${size}`,
    container ? 'table-card' : null,
    dark ? 'table-dark' : null,
    single_line ? 'single-line' : null,
    disable_hover ? 'no-hover' : null,
    className,
  ])

  return (
    <div>
      <table className={css}>
        {children}
      </table>
    </div>
  )
}

export default Table
