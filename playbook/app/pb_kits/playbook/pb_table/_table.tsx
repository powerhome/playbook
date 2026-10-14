import React, { useEffect, useRef } from 'react'
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
import {
    applyStickyColumns,
    scheduleStickyColumns,
} from './utilities/stickyColumns'
import Card from '../pb_card/_card'
import Flex from '../pb_flex/_flex'
import Title from '../pb_title/_title'
import SectionSeparator from '../pb_section_separator/_section_separator'
import Filter from '../pb_filter/_filter'

type TableProps = {
    aria?: { [key: string]: string },
    children: React.ReactNode[] | React.ReactNode,
    className: string,
    cardProps?: { [key: string]: any },
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
    pagination?: React.ReactElement,
    responsive?: "collapse" | "scroll" | "none",
    size?: "sm" | "md" | "lg",
    sticky?: boolean,
    stickyLeftColumn?: string[],
    stickyRightColumn?: string[],
    striped?: boolean,
    tag?: "table" | "div",
    title?: string,
    titleProps?: { [key: string]: any },
    variant?: "default" | "withFilter",
    contrastBorder?: boolean,
    verticalBorder?: boolean,
} & GlobalProps

/**
 * Subcomponent props (Table.Header / Table.Cell). Must be a plain `type NameProps = { ... }` block—
 * `yarn generate-ai-metadata` only parses that shape in this file (not Omit<> / intersection).
 * Not used on the root component; playground routes these via propTargets.
 */
type _TableSubkitSchemaProps = {
    colSpan?: number
}

type AllSizes = "none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "auto" | "initial" | "inherit"

const Table = (props: TableProps): React.ReactElement => {
    const {
        aria = {},
        variant = 'default',
        cardProps = {},
        titleProps = {},
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
        pagination,
        responsive = 'collapse',
        size = 'sm',
        sticky = false,
        stickyLeftColumn = [],
        stickyRightColumn= [],
        striped = false,
        tag = 'table',
        title,
        contrastBorder = false,
        verticalBorder = false,
    } = props

    const ariaProps = buildAriaProps(aria)
    const dataProps = buildDataProps(data)
    const htmlProps = buildHtmlProps(htmlOptions)
    const tableCollapseCss = responsive === 'collapse' ? `table-collapse-${collapse}` : ''
    const contrastBorderCss = contrastBorder ? 'contrast-border' : ''
    const verticalBorderCss = verticalBorder ? 'vertical-border' : ''
    const spaceCssName = outerPadding !== 'none' ? 'space_' : ''
    const outerPaddingCss = outerPadding ? `outer_padding_${spaceCssName}${outerPadding}` : ''
    const isTableTag = tag === 'table'
    const dynamicInlineProps = globalInlineProps(props)
    const tableRef = useRef<HTMLElement | null>(null)
    const setTableRef = (node: HTMLTableElement | HTMLDivElement | null) => {
        tableRef.current = node
    }

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
        contrastBorderCss,
        verticalBorderCss,
        className
    )

    useEffect(() => {
        const table = tableRef.current
        if (!table) return
        if (!stickyLeftColumn.length && !stickyRightColumn.length) return

        const applyStickyOffsets = () => {
            if (stickyLeftColumn.length) {
                applyStickyColumns(table, stickyLeftColumn, 'left')
            }
            if (stickyRightColumn.length) {
                applyStickyColumns(table, stickyRightColumn, 'right')
            }
        }

        const cancelSchedule = scheduleStickyColumns(applyStickyOffsets)
        window.addEventListener('resize', applyStickyOffsets)

        let resizeObserver: ResizeObserver | undefined
        if (typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(applyStickyOffsets)
            resizeObserver.observe(table)
        }

        return () => {
            cancelSchedule()
            window.removeEventListener('resize', applyStickyOffsets)
            resizeObserver?.disconnect()
        }
    }, [stickyLeftColumn, stickyRightColumn])

    useEffect(() => {
        addDataTitle()
    }, [])

    const tableElementProps = {
        ...ariaProps,
        ...dataProps,
        ...htmlProps,
        className: classNames,
        id,
        style: dynamicInlineProps,
    }

    const renderTableElement = () => (
        isTableTag ? (
            <table
                {...tableElementProps}
                ref={setTableRef}
            >
                {children}
            </table>
        ) : (
            <div
                {...tableElementProps}
                ref={setTableRef}
            >
                {children}
            </div>
        )
    )

// ------------ Default Table (non-filter variant rendering) ------------
    const renderTable = () => {
        if (responsive === 'scroll') {
            return (
                <div className='table-responsive-scroll'>
                    {renderTableElement()}
                </div>
            )
        }

        return renderTableElement()
    }
// ------------ End Default Table (non-filter variant rendering) ------------

// ------------ variant = 'withFilter' rendering  ------------
    const renderCardVariant = () => {
        const tableElement = responsive === 'scroll' ? (
            <div className='table-responsive-scroll'>
                {renderTableElement()}
            </div>
        ) : (
            renderTableElement()
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
        
        // Default card props that CAN be overridden (All props from Card kit CAN be used, but these are the ones we set as defaults)
        const defaultCardProps: { [key: string]: any } = {
            padding: "none",
        }

        // Merge default props with user-provided props (user props override defaults)
        const mergedCardProps = { ...defaultCardProps, ...cardProps }

        // Default title props that CAN be overridden (All props from Title kit CAN be used, but these are the ones we set as defaults)
        const defaultTitleProps: { [key: string]: any } = {
            size: 3,
            paddingY: "md",
        }

        // Merge default props with user-provided props (user props override defaults)
        const mergedTitleProps = { ...defaultTitleProps, ...titleProps }

        return (
            <>
                {title && (
                    <Title {...mergedTitleProps} 
                        text={title} 
                    />      
                )}
                <Card
                    {...mergedCardProps}
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
                        {pagination && (
                            <>
                                {pagination}
                                <SectionSeparator />
                            </>
                        )}
                        {tableElement}
                        {pagination && (
                            <>
                                {pagination}
                            </>
                        )}
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
