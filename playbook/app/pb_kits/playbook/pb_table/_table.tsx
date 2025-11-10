import React, { useEffect } from 'react'
import classnames from 'classnames'
import { buildAriaProps, buildDataProps, buildHtmlProps } from '../utilities/props'
import { globalProps, GlobalProps, globalInlineProps } from '../utilities/globalProps'
import {
    TableHead,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
} from "./subcomponents";
import { addDataTitle } from './utilities/addDataTitle'

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
    headerStyle?: "default" | "borderless" | "floating"
    htmlOptions?: { [key: string]: string | number | boolean | (() => void) },
    id?: string,
    outerPadding?: "none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl",
    responsive?: "collapse" | "scroll" | "none",
    singleLine?: boolean,
    size?: "sm" | "md" | "lg",
    sticky?: boolean,
    stickyLeftColumn?: string[],
    stickyRightColumn?: string[],
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
        headerStyle = "default",
        htmlOptions = {},
        id,
        outerPadding = '',
        responsive = 'collapse',
        singleLine = false,
        size = 'sm',
        sticky = false,
        stickyLeftColumn = [],
        stickyRightColumn= [],
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
    const stickyRightColumnReversed = stickyRightColumn.reverse()

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
            'sticky-left-column': stickyLeftColumn.length,
            'sticky-right-column': stickyRightColumn.length,
            'striped': striped,
            'header-borderless': headerStyle === 'borderless',
            'header-floating': headerStyle === 'floating',
            [outerPaddingCss]: outerPadding !== '',
        },
        globalProps(props),
        tableCollapseCss,
        verticalBorderCss,
        className
    )

    useEffect(() => {
        const handleStickyLeftColumns = () => {
            if (!stickyLeftColumn.length) return;
            let accumulatedWidth = 0;

            stickyLeftColumn.forEach((colId, index) => {
                const isLastColumn = index === stickyLeftColumn.length - 1;
                const header = document.querySelector(`th[data-sticky-id="${colId}"]`);
                const cells = document.querySelectorAll(`td[data-sticky-id="${colId}"]`);

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

                    const headerWidth = (header as HTMLElement).offsetWidth;
                    accumulatedWidth += headerWidth;

                    cells.forEach((cell) => {
                        cell.classList.add('sticky');
                        (cell as HTMLElement).style.left = `${accumulatedWidth - headerWidth}px`;

                        if (!isLastColumn) {
                            cell.classList.add('with-border-right');
                            cell.classList.remove('sticky-left-shadow');
                        } else {
                            cell.classList.remove('with-border-right');
                            cell.classList.add('sticky-left-shadow');
                        }
                    });
                }
            });
        };

        setTimeout(() => {
            handleStickyLeftColumns();
        }, 10);

        window.addEventListener('resize', handleStickyLeftColumns);

        return () => {
            window.removeEventListener('resize', handleStickyLeftColumns);
        };
    }, [stickyLeftColumn]);

    useEffect(() => {
        const handleStickyRightColumns = () => {
            if (!stickyRightColumn.length) return;
            let accumulatedWidth = 0;

            stickyRightColumnReversed.forEach((colId, index) => {
                const isLastColumn = index === stickyRightColumn.length - 1;
                const header = document.querySelector(`th[data-sticky-id="${colId}"]`);
                const cells = document.querySelectorAll(`td[data-sticky-id="${colId}"]`);

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

                    const headerWidth = (header as HTMLElement).offsetWidth;
                    accumulatedWidth += headerWidth;

                    cells.forEach((cell) => {
                        cell.classList.add('sticky');
                        (cell as HTMLElement).style.right = `${accumulatedWidth - headerWidth}px`;

                        if (!isLastColumn) {
                            cell.classList.add('with-border-left');
                            cell.classList.remove('sticky-right-shadow');
                        } else {
                            cell.classList.remove('with-border-left');
                            cell.classList.add('sticky-right-shadow');
                        }
                    });
                }
            });
        };

        setTimeout(() => {
            handleStickyRightColumns();
        }, 10);

        window.addEventListener('resize', handleStickyRightColumns);

        return () => {
            window.removeEventListener('resize', handleStickyRightColumns);
        };
    }, [stickyRightColumn]);

    useEffect(() => {
        addDataTitle()
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
