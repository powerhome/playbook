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
    isFullscreen,
    toggleFullscreen,
    fullscreenable
  } = useContext(AdvancedTableContext)

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
  return (
    <>
      <thead className={classes}
          id={id}
      >
        {/* Get the header groups (only one in this example) */}
        {table.getHeaderGroups().map((headerGroup: HeaderGroup<GenericObject>) => (
          <tr key={`${headerGroup.id}-headerGroup`}>
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
                    fullscreenable={fullscreenable}
                    handleExpandOrCollapse={handleExpandOrCollapse}
                    header={header}
                    headerChildren={children}
                    isFullscreen={isFullscreen}
                    isPinnedLeft={isPinnedLeft}
                    key={`${header.id}-header`}
                    loading={loading}
                    sortIcon={sortIcon}
                    table={table}
                    toggleFullscreen={toggleFullscreen}
                />
              )
            })}
          </tr>
        ))}
      </thead>
    </>
  )
}
