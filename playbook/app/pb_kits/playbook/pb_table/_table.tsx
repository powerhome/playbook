import React, { useEffect } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'
import PbTable from '.'

type TableProps = {
  aria?: { [key: string]: string },
  children: React.ReactNode[] | React.ReactNode,
  className: string,
  collapse?: "sm" | "md" | "lg",
  container: boolean,
  dark?: boolean,
  data?: { [key: string]: string },
  dataTable: boolean,
  disableHover?: boolean,
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string,
  responsive: "collapse" | "scroll" | "none",
  singleLine?: boolean,
  size?: "sm" | "md" | "lg",
  sticky?: boolean,
  verticalBorder?: boolean,
} & GlobalProps

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
    htmlOptions = {},
    id,
    responsive = 'collapse',
    singleLine = false,
    size = 'sm',
    sticky = false,
    verticalBorder = false,
  } = props

  const ariaProps = buildAriaProps(aria)
  const dataProps = buildDataProps(data)
  const htmlProps = buildHtmlProps(htmlOptions)
  const tableCollapseCss = responsive !== 'none' ? `table-collapse-${collapse}` : ''
  const verticalBorderCss = verticalBorder ? 'vertical-border' : ''

  useEffect(() => {
    const instance = new PbTable()
    instance.connect()
  }, [])

  return (
    <table
        {...ariaProps}
        {...dataProps}
        {...htmlProps}
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
          verticalBorderCss,
          className
        )}
        id={id}
    >
        {children}
    </table>
  )
}

export default Table
