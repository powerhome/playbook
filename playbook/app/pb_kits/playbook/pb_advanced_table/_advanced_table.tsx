import React, { useRef, useEffect } from "react";
import classnames from "classnames";

import { GenericObject } from "../types";
import { Row, RowSelectionState } from "@tanstack/react-table";

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

type AdvancedTableProps = {
  aria?: { [key: string]: string }
  actions?: React.ReactNode[] | React.ReactNode
  children?: React.ReactNode | React.ReactNode[]
  className?: string
  columnDefinitions: GenericObject[]
  dark?: boolean
  data?: { [key: string]: string }
  enableToggleExpansion?: "all" | "header" | "none"
  expandedControl?: GenericObject
  htmlOptions?: {[key: string]: string | number | boolean | (() => void)},
  id?: string
  initialLoadingRowsCount?: number
  inlineRowLoading?: boolean
  loading?: boolean | string
  maxHeight?: "auto" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl"
  onRowToggleClick?: (arg: Row<GenericObject>) => void
  onToggleExpansionClick?: (arg: Row<GenericObject>) => void
  pagination?: boolean,
  paginationProps?: GenericObject
  responsive?: "scroll" | "none",
  selectableRows?: boolean,
  showActionsBar?: boolean,
  sortControl?: GenericObject
  tableData: GenericObject[]
  tableOptions?: GenericObject
  tableProps?: GenericObject
  toggleExpansionIcon?: string | string[]
  onRowSelectionChange?: (arg: RowSelectionState) => void
  virtualizedRows?: boolean
} & GlobalProps;

const AdvancedTable = (props: AdvancedTableProps) => {
  const {
    aria = {},
    actions,
    children,
    className,
    columnDefinitions,
    dark = false,
    data = {},
    enableToggleExpansion = "header",
    expandedControl,
    htmlOptions = {},
    id,
    initialLoadingRowsCount = 10,
    inlineRowLoading = false,
    loading,
    maxHeight,
    onRowToggleClick,
    onToggleExpansionClick,
    pagination = false,
    paginationProps,
    responsive = "scroll",
    showActionsBar = true,
    selectableRows,
    sortControl,
    tableData,
    tableOptions,
    tableProps,
    toggleExpansionIcon = "arrows-from-line",
    onRowSelectionChange,
    virtualizedRows = false,
  } = props;

  // Component refs
  const tableWrapperRef = useRef<HTMLDivElement>(null);

  // Initialize table state
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
    isFetching
  } = useTableState({
    tableData,
    columnDefinitions,
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
    onRowSelectionChange
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
    onRowSelectionChange
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

  // Build CSS classes and props
  const ariaProps = buildAriaProps(aria);
  const dataProps = buildDataProps(data);
  const htmlProps = buildHtmlProps(htmlOptions);
  const classes = classnames(
    buildCss("pb_advanced_table"),
    `advanced-table-responsive-${responsive}`,
    maxHeight ? `advanced-table-max-height-${maxHeight}` : '',
    globalProps(props),
    className
  );

  // Table wrapper styling with virtualization support
  const tableWrapperStyle = virtualizedRows
    ? getVirtualizedContainerStyles(maxHeight)
    : {};

  // Visibility flag for action bar
  const isActionBarVisible = selectableRows && showActionsBar && selectedRowsLength > 0;

  return (
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
      <AdvancedTableProvider
          columnDefinitions={columnDefinitions}
          enableToggleExpansion={enableToggleExpansion}
          enableVirtualization={virtualizedRows}
          expanded={expanded}
          expandedControl={expandedControl}
          handleExpandOrCollapse={handleExpandOrCollapse}
          hasAnySubRows={hasAnySubRows}
          inlineRowLoading={inlineRowLoading}
          isActionBarVisible={isActionBarVisible}
          loading={loading}
          responsive={responsive}
          selectableRows={selectableRows}
          setExpanded={setExpanded}
          showActionsBar={showActionsBar}
          sortControl={sortControl}
          subRowHeaders={tableOptions?.subRowHeaders}
          table={table}
          tableContainerRef={tableWrapperRef}
          toggleExpansionIcon={toggleExpansionIcon}
          virtualizedRows={virtualizedRows}
      >
        <React.Fragment>
          {/* Top Pagination */}
          {pagination && (
            <TablePagination
                onChange={onPageChange}
                position="top"
                range={paginationProps?.range}
                table={table}
            />
          )}

          {/* Selection Action Bar */}
          <TableActionBar
              actions={actions}
              isVisible={isActionBarVisible}
              selectedCount={selectedRowsLength}
          />

          {/* Main Table */}
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
                <TableBody />
              </>
            )}
          </Table>

          {/* Bottom Pagination */}
          {pagination && (
            <TablePagination
                onChange={onPageChange}
                position="bottom"
                range={paginationProps?.range}
                table={table}
            />
          )}
        </React.Fragment>
      </AdvancedTableProvider>
    </div>
  );
};

// Re-export sub-components
AdvancedTable.Header = TableHeader;
AdvancedTable.Body = TableBody;

export default AdvancedTable;
