import React, { useRef, useEffect, useState, useCallback } from "react";
import classnames from "classnames";

import { GenericObject } from "../types";
import { Row, RowSelectionState, RowPinningState } from "@tanstack/react-table";

import { buildAriaProps, buildCss, buildDataProps, buildHtmlProps } from "../utilities/props";
import { globalProps, GlobalProps } from "../utilities/globalProps";

import Table from "../pb_table/_table";
import { AdvancedTableProvider } from "./Context/AdvancedTableContext";
import { getVirtualizedContainerStyles } from "./Utilities/TableContainerStyles";

import { TableHeader } from "./SubKits/TableHeader";
import { TableBody } from "./SubKits/TableBody";
import TablePagination from "./Components/TablePagination";
import TableActionBar from "./Components/TableActionBar";

import { useTableState } from "./Hooks/useTableState";
import { useTableActions } from "./Hooks/useTableActions";

import Card from "../pb_card/_card"
import Flex from "../pb_flex/_flex"
import Icon from "../pb_icon/_icon"

type FullscreenControls = {
  toggleFullscreen: () => void;
  isFullscreen: boolean;
};

type AdvancedTableProps = {
  aria?: { [key: string]: string }
  actions?: React.ReactNode[] | React.ReactNode
  children?: React.ReactNode | React.ReactNode[]
  className?: string
  columnDefinitions: GenericObject[]
  columnGroupBorderColor?: "text_lt_default" | "text_lt_light" | "text_lt_lighter" | "text_dk_default" | "text_dk_light" | "text_dk_lighter"
  columnVisibilityControl?: GenericObject
  customSort?:boolean;
  dark?: boolean
  data?: { [key: string]: string }
  enableToggleExpansion?: "all" | "header" | "none"
  enableSortingRemoval?: boolean
  expandedControl?: GenericObject
  expandByDepth?: { [key: string]: string | number }
  onExpandByDepthClick?: (arg: number, arg1: any) => void
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string
  initialLoadingRowsCount?: number
  inlineRowLoading?: boolean
  loading?: boolean | string
  maxHeight?: "auto" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl"
  onRowToggleClick?: (arg: Row<GenericObject>) => void
  onToggleExpansionClick?: (arg: Row<GenericObject>) => void
  pagination?: boolean,
  paginationProps?: GenericObject,
  pinnedRows?: {
    value?: RowPinningState;
    onChange?: (value: RowPinningState) => void;
  };
  responsive?: "scroll" | "none",
  rowStyling?: GenericObject[],
  scrollBarNone?: boolean,
  selectableRows?: boolean,
  showActionsBar?: boolean,
  persistToggleExpansionButton?: boolean,
  sortControl?: GenericObject
  tableData: GenericObject[]
  tableOptions?: GenericObject
  tableProps?: GenericObject
  toggleExpansionIcon?: string | string[]
  onRowSelectionChange?: (arg: RowSelectionState) => void
  onCustomSortClick?: (arg: GenericObject[]) => void
  virtualizedRows?: boolean
  allowFullScreen?: boolean
  fullScreenControl?: (controls: FullscreenControls) => void
} & GlobalProps;

const AdvancedTable = (props: AdvancedTableProps) => {
  const {
    aria = {},
    actions,
    children,
    className,
    columnDefinitions,
    columnGroupBorderColor,
    columnVisibilityControl,
    customSort,
    dark = false,
    data = {},
    enableToggleExpansion = "header",
    enableSortingRemoval = false,
    expandedControl,
    expandByDepth,
    onExpandByDepthClick,
    htmlOptions = {},
    id,
    initialLoadingRowsCount = 10,
    inlineRowLoading = false,
    loading,
    maxHeight,
    onRowToggleClick,
    onToggleExpansionClick,
    onCustomSortClick,
    pagination = false,
    paginationProps,
    pinnedRows,
    responsive = "scroll",
    rowStyling,
    scrollBarNone= false,
    showActionsBar = true,
    selectableRows,
    persistToggleExpansionButton = false,
    sortControl,
    stickyLeftColumn,
    tableData,
    tableOptions,
    tableProps,
    toggleExpansionIcon = "arrows-from-line",
    onRowSelectionChange,
    virtualizedRows = false,
    allowFullScreen = false,
    fullScreenControl,
  } = props;

  // Component refs
  const tableWrapperRef = useRef<HTMLDivElement>(null);

  const {
    table,
    expanded,
    setExpanded,
    hasAnySubRows,
    selectedRowsLength,
    fetchNextPage,
    updateLoadingStateRowCount,
    fullData,
    totalFetched,
    isFetching,
    localPagination,
    setLocalPagination
  } = useTableState({
    tableData,
    columnDefinitions,
    enableSortingRemoval,
    expandedControl,
    sortControl,
    onRowToggleClick,
    selectableRows,
    initialLoadingRowsCount,
    loading,
    pagination,
    paginationProps,
    virtualizedRows,
    tableOptions,
    onRowSelectionChange,
    columnVisibilityControl,
    pinnedRows,
    rowStyling,
    inlineRowLoading
  });

  // Initialize table actions
  const {
    handleExpandOrCollapse,
    onPageChange,
    fetchMoreOnBottomReached
  } = useTableActions({
    table,
    expanded,
    setExpanded,
    onToggleExpansionClick,
    onRowSelectionChange,
    inlineRowLoading,
    localPagination,
    setLocalPagination
  });

  // Set table row count for loading state
  useEffect(() => {
    if (!loading) {
      updateLoadingStateRowCount();
    }
  }, [loading, updateLoadingStateRowCount]);

  // Check for infinite scroll
  useEffect(() => {
    fetchMoreOnBottomReached(
      tableWrapperRef.current,
      fetchNextPage,
      isFetching,
      totalFetched,
      fullData.length
    );
  }, [fetchMoreOnBottomReached, fetchNextPage, isFetching, totalFetched, fullData.length]);

  // Fullscreen
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prevState => !prevState)
  }, [])

  useEffect(() => {
    if (allowFullScreen && fullScreenControl) {
      fullScreenControl({
        toggleFullscreen,
        isFullscreen
      })
    }
  }, [allowFullScreen, fullScreenControl, toggleFullscreen, isFullscreen])

  const renderFullscreenHeader = () => {
    if (!isFullscreen) return null

    const defaultMinimizeIcon = (
      <button
          className="gray-icon fullscreen-icon"
          onClick={toggleFullscreen}
      >
        <Icon
            cursor="pointer"
            fixedWidth
            icon="arrow-down-left-and-arrow-up-right-to-center"
            {...props}
        />
      </button>
    )

    return (
      <Card
          borderNone
          borderRadius="none"
          className="advanced-table-fullscreen-header"
          {...props}
      >
          <Flex justify="end">
            {defaultMinimizeIcon}
          </Flex>
      </Card>
    )
  }

  useEffect(() => {
    if (!allowFullScreen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        event.preventDefault()
        toggleFullscreen()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [allowFullScreen, toggleFullscreen, isFullscreen])

  // Build CSS classes and props
  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(htmlOptions);

  // Visibility flag for action bar
  const isActionBarVisible = (selectableRows && showActionsBar && selectedRowsLength > 0) || columnVisibilityControl;

  const classes = classnames(
    buildCss("pb_advanced_table"),
    `advanced-table-responsive-${responsive}`,
    maxHeight ? `advanced-table-max-height-${maxHeight}` : '',
    {
      'advanced-table-fullscreen': isFullscreen,
      'advanced-table-allow-fullscreen': allowFullScreen,
      // Add the hidden-action-bar class when action bar functionality exists but is not visible
      'hidden-action-bar': (selectableRows || columnVisibilityControl) && !isActionBarVisible,
    },
    {'advanced-table-sticky-left-columns': stickyLeftColumn && stickyLeftColumn.length > 0},
    columnGroupBorderColor ? `column-group-border-${columnGroupBorderColor}` : '',
    scrollBarNone ? 'advanced-table-hide-scrollbar' : '',
    globalProps(props),
    className
  );

  // Table wrapper styling with virtualization support
  const tableWrapperStyle = virtualizedRows
    ? getVirtualizedContainerStyles(maxHeight)
    : {};

  // The actual Main <Table /> element
  const tableElement = (
    <Table
        className={`${loading ? "content-loading" : ""}`}
        dark={dark}
        dataTable
        numberSpacing="tabular"
        responsive="none"
        {...tableProps}
    >
      {children ? (
        children
      ) : (
        <>
          <TableHeader />
          <TableBody
              isFetching={isFetching}
          />
        </>
      )}
    </Table>
  )

  return (
    <>
      {/* Top Pagination */}
      {pagination && (
        <TablePagination
            onChange={onPageChange}
            position="top"
            range={paginationProps?.range}
            table={table}
        />
      )}

      <div
          {...ariaProps}
          {...dataProps}
          {...htmlProps}
          className={classes}
          id={id}
          onScroll={virtualizedRows ? e => fetchMoreOnBottomReached(
            e.currentTarget,
            fetchNextPage,
            isFetching,
            totalFetched,
            fullData.length
          ) : undefined}
          ref={tableWrapperRef}
          style={tableWrapperStyle as React.CSSProperties}
      >
        {renderFullscreenHeader()}
        <AdvancedTableProvider
            columnDefinitions={columnDefinitions}
            columnGroupBorderColor={columnGroupBorderColor}
            columnVisibilityControl={columnVisibilityControl}
            customSort={customSort}
            enableSortingRemoval={enableSortingRemoval}
            enableToggleExpansion={enableToggleExpansion}
            enableVirtualization={virtualizedRows}
            expandByDepth={expandByDepth}
            expanded={expanded}
            expandedControl={expandedControl}
            handleExpandOrCollapse={handleExpandOrCollapse}
            hasAnySubRows={hasAnySubRows}
            inlineRowLoading={inlineRowLoading}
            isActionBarVisible={isActionBarVisible}
            isFullscreen={isFullscreen}
            loading={loading}
            onCustomSortClick={onCustomSortClick}
            onExpandByDepthClick={onExpandByDepthClick}
            persistToggleExpansionButton={persistToggleExpansionButton}
            pinnedRows={pinnedRows}
            responsive={responsive}
            rowStyling={rowStyling}
            selectableRows={selectableRows}
            setExpanded={setExpanded}
            showActionsBar={showActionsBar}
            sortControl={sortControl}
            stickyLeftColumn={stickyLeftColumn}
            subRowHeaders={tableOptions?.subRowHeaders}
            table={table}
            tableContainerRef={tableWrapperRef}
            toggleExpansionIcon={toggleExpansionIcon}
            totalAvailableCount={fullData.length}
            virtualizedRows={virtualizedRows}
        >
          <React.Fragment>
            {/* Selection Action Bar */}
            <TableActionBar
                actions={actions}
                isVisible={isActionBarVisible}
                selectedCount={selectedRowsLength}
                type={columnVisibilityControl ? "column-visibility" : "row-selection"}
            />

            {/* Virtualized wrapper div only if virtualizedRows is true */}
            {virtualizedRows ? (
              <div style={{ overflow: 'auto', width: '100%' }}>
                {tableElement}
              </div>
            ) : (
              tableElement
            )}
          </React.Fragment>
        </AdvancedTableProvider>

      </div>
      {/* Bottom Pagination */}
      {pagination && (
        <TablePagination
            onChange={onPageChange}
            position="bottom"
            range={paginationProps?.range}
            table={table}
        />
      )}
    </>
  );
};

// Re-export sub-components
AdvancedTable.Header = TableHeader;
AdvancedTable.Body = TableBody;

export default AdvancedTable;
