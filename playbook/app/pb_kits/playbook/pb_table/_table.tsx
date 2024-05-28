import React, { useEffect } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps } from '../utilities/globalProps'
import PbTable from '.'
import {
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "./subcomponents";

type TableProps = {
    aria?: { [key: string]: string },
    children: React.ReactNode[] | React.ReactNode,
    className: string,
    collapse?: "sm" | "md" | "lg",
    container?: boolean,
    dark?: boolean,
    data?: { [key: string]: string },
    dataTable: boolean,
    disableHover?: boolean,
    htmlOptions?: { [key: string]: string | number | boolean | (() => void) },
    id?: string,
    outerPadding?: "none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl",
    responsive?: "collapse" | "scroll" | "none",
    singleLine?: boolean,
    size?: "sm" | "md" | "lg",
    sticky?: boolean,
    striped?: boolean,
    tag?: "table" | "div",
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
        outerPadding = 'none',
        responsive = 'collapse',
        singleLine = false,
        size = 'sm',
        sticky = false,
        striped = false,
        tag = 'table',
        verticalBorder = false,
    } = props

    const ariaProps = buildAriaProps(aria)
    const dataProps = buildDataProps(data)
    const htmlProps = buildHtmlProps(htmlOptions)
    const tableCollapseCss = responsive !== 'none' ? `table-collapse-${collapse}` : ''
    const verticalBorderCss = verticalBorder ? 'vertical-border' : ''
    const outerPaddingCss = outerPadding !== 'none' ? `outer_padding_space_${outerPadding}` : ''
    const isTableTag = tag === 'table'

    const classNames = classnames(
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
            'striped': striped,
            [outerPaddingCss]: outerPadding !== 'none',
        },
        globalProps(props),
        tableCollapseCss,
        verticalBorderCss,
        className
    )

    useEffect(() => {
        const instance = new PbTable()
        instance.connect()
    }, [])

    return (
        <>
            {isTableTag ? (
                <table
                    {...ariaProps}
                    {...dataProps}
                    {...htmlProps}
                    className={classNames}
                    id={id}
                >
                    {children}
                </table>
            ) : (
                <div
                    {...ariaProps}
                    {...dataProps}
                    {...htmlProps}
                    className={classNames}
                    id={id}
                >
                    {children}
                </div>
            )}
        </>
    )
}

Table.Head = TableHead
Table.Header = TableHeader
Table.Body = TableBody
Table.Row = TableRow
Table.Cell = TableCell

export default Table
