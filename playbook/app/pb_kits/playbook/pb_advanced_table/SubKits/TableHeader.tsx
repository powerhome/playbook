import React, { useContext } from "react"
import classnames from "classnames"
import { HeaderGroup } from "@tanstack/react-table"

import { GenericObject } from "../../types"

import { buildCss } from "../../utilities/props"
import { globalProps } from "../../utilities/globalProps"

import Checkbox from "../../pb_checkbox/_checkbox"

import { TableHeaderCell } from "../Components/TableHeaderCell"
import { isChrome } from "../Utilities/BrowserCheck"
import AdvancedTableContext from "../Context/AdvancedTableContext"

type TableHeaderProps = {
  children?: React.ReactNode | React.ReactNode[]
  className?: string
  dark?: boolean,
  enableSorting?: boolean
  id?: string
  sortIcon?: string | string[]
}

export const TableHeader = ({
  children,
  className,
  dark = false,
  enableSorting = false,
  id,
  sortIcon = ["arrow-up-wide-short", "arrow-down-short-wide"],
  ...props
}: TableHeaderProps) => {
  const {
    columnVisibilityControl,
    enableToggleExpansion,
    handleExpandOrCollapse,
    loading,
    table,
    hasAnySubRows,
    showActionsBar,
    selectableRows,
    persistToggleExpansionButton,
    responsive,
    headerRef,
    virtualizedRows,
    enableVirtualization,
  } = useContext(AdvancedTableContext)

  const isVirtualized = virtualizedRows || enableVirtualization;

  const classes = classnames(
    buildCss("pb_advanced_table_header"),
    globalProps(props),
    className
  )

  const columnPinning = table.getState().columnPinning;

  const customCellClassnames = classnames(
    "table-header-cells-custom",
    `${showActionsBar && "header-cells-with-actions"}`,
    `${isChrome() ? "chrome-styles" : ""}`,
    `${responsive === "scroll" && "pinned-left"}`,
  );

  // TanStack drops header rows when every leaf in a group is hidden.
  // Spacer rows keep that height only when Select All can hide a whole group.
  const showSelectAll = columnVisibilityControl?.showSelectAll === true
  let hiddenHeaderRowCount = 0
  let spacerColSpan = 0
  if (showSelectAll) {
    const columnHeaderDepth = Math.max(
      ...table.getAllFlatColumns().map((column: GenericObject) => column.depth + 1)
    )
    hiddenHeaderRowCount = columnHeaderDepth - table.getHeaderGroups().length
    spacerColSpan = table.getVisibleLeafColumns().length + (!hasAnySubRows && selectableRows ? 1 : 0)
  }

  const renderSpacerRows = (rowClassName?: string) =>
    Array.from({ length: Math.max(0, hiddenHeaderRowCount) }, (_, index) => (
      <tr
          aria-hidden="true"
          className={classnames("header-spacer-row", rowClassName)}
          key={`header-spacer-${index}`}
      >
        {/* header-spacer-cell stays off .table-header-cells so width measurement and sticky-left styles skip it. */}
        <th
            className="header-spacer-cell"
            colSpan={spacerColSpan}
        />
      </tr>
    ))

  // Empty checkbox-column cell on upper multi-header rows; checkbox only on the lowest row.
  const renderSelectableHeaderCell = (
    isLowestHeaderRow: boolean,
    extraClassName?: string
  ) => (
    <th className={classnames(customCellClassnames, "checkbox-cell-header", extraClassName)}>
      {isLowestHeaderRow ? (
        <Checkbox
            checked={table?.getIsAllRowsSelected()}
            indeterminate={table?.getIsSomeRowsSelected()}
            onChange={table?.getToggleAllRowsSelectedHandler()}
        />
      ) : null}
    </th>
  )

  const renderRegularTableHeader = () => (
    <thead className={classes}
        id={id}
        ref={headerRef}
    >
      {renderSpacerRows()}
      {table.getHeaderGroups().map((headerGroup: HeaderGroup<GenericObject>, headerGroupIndex: number, headerGroups: HeaderGroup<GenericObject>[]) => {
        const isLowestHeaderRow = headerGroupIndex === headerGroups.length - 1

        return (
          <tr key={`${headerGroup.id}-headerGroup`}>
            {!hasAnySubRows && selectableRows && renderSelectableHeaderCell(isLowestHeaderRow)}
            {headerGroup.headers.map(header => {
              const isPinnedLeft = columnPinning.left.includes(header.id)
              return (
                <TableHeaderCell
                    enableSorting={enableSorting}
                    enableToggleExpansion={enableToggleExpansion}
                    handleExpandOrCollapse={handleExpandOrCollapse}
                    header={header}
                    headerChildren={children}
                    isPinnedLeft={isPinnedLeft}
                    key={`${header.id}-header`}
                    loading={loading}
                    persistToggleExpansionButton={persistToggleExpansionButton}
                    sortIcon={sortIcon}
                    table={table}
                />
              )
            })}
          </tr>
        )
      })}
    </thead>
  );

  const renderVirtualizedTableHeader = () => (
    <thead
        className={classes}
        data-virtualized="true"
        id={id}
        ref={headerRef}
    >
      {renderSpacerRows("virtualized-header-row-header")}
      {table.getHeaderGroups().map((headerGroup: HeaderGroup<GenericObject>, headerGroupIndex: number, headerGroups: HeaderGroup<GenericObject>[]) => {
        const isLowestHeaderRow = headerGroupIndex === headerGroups.length - 1

        return (
          <tr
              className="virtualized-header-row-header"
              key={`${headerGroup.id}-headerGroup-virtualized`}
          >
            {!hasAnySubRows && selectableRows && renderSelectableHeaderCell(isLowestHeaderRow, "virtualized-header-cell")}
            {headerGroup.headers.map(header => {
              const isPinnedLeft = columnPinning.left.includes(header.id)
              return (
                <TableHeaderCell
                    enableSorting={enableSorting}
                    enableToggleExpansion={enableToggleExpansion}
                    handleExpandOrCollapse={handleExpandOrCollapse}
                    header={header}
                    headerChildren={children}
                    isPinnedLeft={isPinnedLeft}
                    isVirtualized
                    key={`${header.id}-header-virtualized`}
                    loading={loading}
                    persistToggleExpansionButton={persistToggleExpansionButton}
                    sortIcon={sortIcon}
                    table={table}
                />
              )
            })}
          </tr>
        )
      })}
    </thead>
  );
  return (
    <>      
      {isVirtualized ? renderVirtualizedTableHeader() : renderRegularTableHeader()}
    </>
  )
}
