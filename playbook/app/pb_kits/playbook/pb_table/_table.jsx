/* eslint-disable camelcase */
/* @flow */

import React, { type Node } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildDataProps } from '../utilities/props'
import { globalProps } from '../utilities/globalProps'
import PbTable from './'

type TableProps = {
  aria?: object,
  children: array<Node> | Node,
  className: string,
  collapse?: "sm" | "md" | "lg",
  container: boolean,
  dark?: boolean,
  data?: object,
  dataTable: boolean,
  disableHover: boolean,
  id?: string,
  responsive: "collapse" | "scroll" | "none",
  singleLine: boolean,
  size: "sm" | "md" | "lg",
  sticky?: boolean,
}

const Table = (props: TableProps) => {
  const {
    aria = {},
    children,
    className,
    collapse = 'sm',
    container = true,
    dark,
    data = {},
    dataTable = false,
    disableHover = false,
    id,
    responsive = 'collapse',
    singleLine = false,
    size = 'sm',
    sticky = false,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const tableCollapseCss =
    responsive !== 'none' ? `table-collapse-${collapse}` : ''

  const instance = new PbTable()
  instance.connect()

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
          'sticky-header': sticky,
        },
        globalProps(props),
        tableCollapseCss,
        className
      )}
        id={id}
    >
      {children}
    </table>
  )
}

export default Table
