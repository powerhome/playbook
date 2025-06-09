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
  sortIcon = ["arrow-up-short-wide", "arrow-down-short-wide"],
  ...props
}: TableHeaderProps) => {
  const {
    enableToggleExpansion,
    handleExpandOrCollapse,
    loading,
    table,
    hasAnySubRows,
    showActionsBar,
    selectableRows,
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

  const renderRegularTableHeader = () => (
    <thead className={classes} 
        id={id}
    >
      {table.getHeaderGroups().map((headerGroup: HeaderGroup<GenericObject>, index: number) => (
        <tr 
            key={`${headerGroup.id}-headerGroup`}
            ref={index === 0 ? headerRef : null}
        >
          {!hasAnySubRows && selectableRows && (
            <th className={customCellClassnames}>
              <Checkbox
                  checked={table?.getIsAllRowsSelected()}
                  indeterminate={table?.getIsSomeRowsSelected()}
                  onChange={table?.getToggleAllRowsSelectedHandler()}
              />
            </th>
          )}
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
                  sortIcon={sortIcon}
                  table={table}
              />
            )
          })}
        </tr>
      ))}
    </thead>
  );

  const renderVirtualizedTableHeader = () => (
    <thead 
        className={classes} 
        data-virtualized="true"
        id={id}
    >
      {table.getHeaderGroups().map((headerGroup: HeaderGroup<GenericObject>, index: number) => (
        <tr 
            className="virtualized-header-row-header"
            key={`${headerGroup.id}-headerGroup-virtualized`}
            ref={index === 0 ? headerRef : null}
        >
          {!hasAnySubRows && selectableRows && (
            <th className={classnames(customCellClassnames, "virtualized-header-cell")}>
              <Checkbox
                  checked={table?.getIsAllRowsSelected()}
                  indeterminate={table?.getIsSomeRowsSelected()}
                  onChange={table?.getToggleAllRowsSelectedHandler()}
              />
            </th>
          )}
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
                  sortIcon={sortIcon}
                  table={table}
              />
            )
          })}
        </tr>
      ))}
    </thead>
  );
  return (
    <>      
      {isVirtualized ? renderVirtualizedTableHeader() : renderRegularTableHeader()}
    </>
  )
}
