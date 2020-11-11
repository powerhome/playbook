/* @flow */

import React, { type Node } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps.js'

type TableProps = {
  aria?: object,
  children: array<Node> | Node,
  className: string,
  container: boolean,
  dark?: boolean,
  data?: object,
  dataTable: boolean,
  disableHover: boolean,
  id?: string,
  responsive: "collapse" | "scroll" | "none",
  singleLine: boolean,
  size: "sm" | "md" | "lg",
}

const Table = (props: TableProps) => {
  const {
    aria = {},
    children,
    className,
    container = true,
    dark,
    data = {},
    dataTable = false,
    disableHover = false,
    id,
    responsive = 'collapse',
    singleLine = false,
    size = 'sm',
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)

  return (
    <table
        {...ariaProps}
        {...dataProps}
        className={classnames(
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
        globalProps(props),
        className
      )}
        id={id}
    >
      {children}
    </table>
  )
}

export default Table
