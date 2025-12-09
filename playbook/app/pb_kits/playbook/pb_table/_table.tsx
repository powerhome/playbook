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
import Card from '../pb_card/_card'
import Flex from '../pb_flex/_flex'
import Title from '../pb_title/_title'
import SectionSeparator from '../pb_section_separator/_section_separator'
import Filter from '../pb_filter/_filter'

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
    filterProps?: { [key: string]: any },
    filterContent?: any,
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
    title?: string,
    variant?: "default" | "withFilter",
    verticalBorder?: boolean,
} & GlobalProps

type AllSizes = "none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "auto" | "initial" | "inherit"

const Table = (props: TableProps): React.ReactElement => {
    const {
        aria = {},
        variant = 'default',
        children,
        className,
        collapse = variant === 'withFilter' ? 'md' : 'sm',
        container = true,
        dark,
        data = {},
        dataTable = false,
        disableHover = false,
        filterProps = {},
        filterContent,
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
        title,
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

    const isFilterVariant = variant === 'withFilter'
    const effectiveContainer = isFilterVariant ? false : container

    const classNames = classnames(
        'pb_table',
        `table-${size}`,
        `table-responsive-${responsive}`,
        {
            'table-card': effectiveContainer,
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

// ------------ Default Table (non-filter variant rendering) ------------
    const renderTable = () => {
        const tableElement = responsive === 'scroll' ? (
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
        )

        return tableElement
    }
// ------------ End Default Table (non-filter variant rendering) ------------

// ------------ variant = 'withFilter' rendering  ------------
    const renderCardVariant = () => {
        // Render table element
        const tableElement = responsive === 'scroll' ? (
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
        )

        // Default filter props that CAN be overridden (All props from Filter kit CAN be used, but these are the ones we set as defaults)
        const defaultFilterProps = {
            background: false,
            maxHeight: "50vh",
            minWidth: "xs",
            popoverProps: { width: "350px" },
        }

        // Merge default props with user-provided props (user props override defaults)
        const mergedFilterProps = { ...defaultFilterProps, ...filterProps }

        return (
            <>
                {title && (
                    <Title         
                        paddingLeft={{
                            xs: "sm",
                            sm: "sm",
                            md: "xl",
                            lg: "xl",
                            xl: "xl",
                            default: "xl",
                        } as any}
                        paddingY="md"
                        size={3}
                        text={title} 
                    />
                )}
                <Card
                    marginX={{
                        xs: "sm",
                        sm: "sm",
                        md: "xl",
                        lg: "xl",
                        xl: "xl",
                        default: "xl",
                    } as any}
                    padding="none"
                >
                    <Flex
                        align="stretch"
                        flexDirection="column"
                        gap="none"
                    >
                        {filterContent && (
                            <Filter {...mergedFilterProps}>
                                {filterContent}
                            </Filter>
                        )}
                        {filterContent && <SectionSeparator />}
                        {tableElement}
                    </Flex>
                </Card>
            </>
        )
    }
// ------------ End variant = 'withFilter' rendering  ------------



    return (
        <>
            {isFilterVariant ? renderCardVariant() : renderTable()}
        </>
    )
}

Table.Head = TableHead
Table.Header = TableHeader
Table.Body = TableBody
Table.Row = TableRow
Table.Cell = TableCell

export default Table
