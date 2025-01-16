import React, { useContext } from "react"
import classnames from "classnames"
import { HeaderGroup } from "@tanstack/react-table"

import { GenericObject } from "../../types"

import { buildCss } from "../../utilities/props"
import { globalProps } from "../../utilities/globalProps"

import { TableHeaderCell } from "../Components/TableHeaderCell"

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
  } = useContext(AdvancedTableContext)

  const classes = classnames(
    buildCss("pb_advanced_table_header"),
    globalProps(props),
    className
  )

  const columnPinning = table.getState().columnPinning;

  return (
    <>
      <thead className={classes}
          id={id}
      >
        {/* Get the header groups (only one in this example) */}
        {table.getHeaderGroups().map((headerGroup: HeaderGroup<GenericObject>) => (
          <tr key={`${headerGroup.id}-headerGroup`}>
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
    </>
  )
}
