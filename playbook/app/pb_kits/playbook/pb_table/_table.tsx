import React, { useEffect } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps, globalInlineProps } from '../utilities/globalProps'
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
    stickyLeftcolumn?: string[],
    stickyRightcolumn?: string[],
    striped?: boolean,
    tag?: "table" | "div",
    verticalBorder?: boolean,
} & GlobalProps

const Table = (props: TableProps): React.ReactElement => {
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
        outerPadding = '',
        responsive = 'collapse',
        singleLine = false,
        size = 'sm',
        sticky = false,
        stickyLeftcolumn = [],
        stickyRightcolumn= [],
        striped = false,
        tag = 'table',
        verticalBorder = false,
    } = props

    const ariaProps = buildAriaProps(aria)
    const dataProps = buildDataProps(data)
    const htmlProps = buildHtmlProps(htmlOptions)
    const tableCollapseCss = responsive !== 'none' ? `table-collapse-${collapse}` : ''
    const verticalBorderCss = verticalBorder ? 'vertical-border' : ''
    const spaceCssName = outerPadding !== 'none' ? 'space_' : ''
    const outerPaddingCss = outerPadding ? `outer_padding_${spaceCssName}${outerPadding}` : ''
    const isTableTag = tag === 'table'
    const dynamicInlineProps = globalInlineProps(props)

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
            'sticky-left-column': stickyLeftcolumn,
            'sticky-right-column': stickyRightcolumn,
            'striped': striped,
            [outerPaddingCss]: outerPadding !== '',
        },
        globalProps(props),
        tableCollapseCss,
        verticalBorderCss,
        className
    )

    useEffect(() => {
        const handleStickyLeftColumns = () => {
            if (!stickyLeftcolumn.length) return;
            let accumulatedWidth = 0;

            stickyLeftcolumn.forEach((colId, index) => {
                const isLastColumn = index === stickyLeftcolumn.length - 1;
                const header = document.querySelector(`th[id="${colId}"]`);
                const cells = document.querySelectorAll(`td[id="${colId}"]`);

                if (header) {
                    header.classList.add('sticky');
                    (header as HTMLElement).style.left = `${accumulatedWidth}px`;

                    if (!isLastColumn) {
                        header.classList.add('with-border-right');
                        header.classList.remove('sticky-left-shadow');
                    } else {
                        header.classList.remove('with-border-right');
                        header.classList.add('sticky-left-shadow');
                    }

                    accumulatedWidth += (header as HTMLElement).offsetWidth;
                }

                cells.forEach((cell) => {
                    cell.classList.add('sticky');
                    (cell as HTMLElement).style.left = `${accumulatedWidth - (header as HTMLElement).offsetWidth}px`;

                    if (!isLastColumn) {
                        cell.classList.add('with-border-right');
                        cell.classList.remove('sticky-left-shadow');
                    } else {
                        cell.classList.remove('with-border-right');
                        cell.classList.add('sticky-left-shadow');
                    }
                });
            });
        };

        setTimeout(() => {
            handleStickyLeftColumns();
        }, 10);

        window.addEventListener('resize', handleStickyLeftColumns);

        return () => {
            window.removeEventListener('resize', handleStickyLeftColumns);
        };
    }, [stickyLeftcolumn]);

    useEffect(() => {
        const handleStickyRightColumns = () => {
            if (!stickyRightcolumn.length) return;
            let accumulatedWidth = 0;

            stickyRightcolumn.reverse().forEach((colId, index) => {
                const isLastColumn = index === stickyRightcolumn.length - 1;
                const header = document.querySelector(`th[id="${colId}"]`);
                const cells = document.querySelectorAll(`td[id="${colId}"]`);

                if (header) {
                    header.classList.add('sticky');
                    (header as HTMLElement).style.right = `${accumulatedWidth}px`;

                    if (!isLastColumn) {
                        header.classList.add('with-border-left');
                        header.classList.remove('sticky-right-shadow');
                    } else {
                        header.classList.remove('with-border-left');
                        header.classList.add('sticky-right-shadow');
                    }

                    accumulatedWidth += (header as HTMLElement).offsetWidth;
                }

                cells.forEach((cell) => {
                    cell.classList.add('sticky');
                    (cell as HTMLElement).style.right = `${accumulatedWidth - (header as HTMLElement).offsetWidth}px`;

                    if (!isLastColumn) {
                        cell.classList.add('with-border-left');
                        cell.classList.remove('sticky-right-shadow');
                    } else {
                        cell.classList.remove('with-border-left');
                        cell.classList.add('sticky-right-shadow');
                    }
                });
            });
        };

        setTimeout(() => {
            handleStickyRightColumns();
        }, 10);
    }, [stickyRightcolumn]);

    useEffect(() => {
        const instance = new PbTable()
        instance.connect()
    }, [])

    return (
        <>
            {responsive === 'scroll' ? (
                <div className='table-responsive-scroll'>
                    {isTableTag ? (
                        <table
                            {...ariaProps}
                            {...dataProps}
                            {...htmlProps}
                            className={classNames}
                            id={id}
                            style={dynamicInlineProps}
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
                            style={dynamicInlineProps}
                        >
                            {children}
                        </div>
                    )}
                </div>
            ) : (
                isTableTag ? (
                    <table
                        {...ariaProps}
                        {...dataProps}
                        {...htmlProps}
                        className={classNames}
                        id={id}
                        style={dynamicInlineProps}
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
                        style={dynamicInlineProps}
                    >
                        {children}
                    </div>
                )
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
