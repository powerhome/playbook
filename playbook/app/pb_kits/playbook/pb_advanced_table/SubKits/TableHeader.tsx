import React, { useContext } from "react"
import classnames from "classnames"
import { HeaderGroup } from "@tanstack/react-table"

import { GenericObject } from "../../types"

import { buildCss } from "../../utilities/props"
import { globalProps } from "../../utilities/globalProps"

import Checkbox from "../../pb_checkbox/_checkbox"
import Dropdown from "../../pb_dropdown/_dropdown"
import Icon from "../../pb_icon/_icon"
import Caption from "../../pb_caption/_caption"
import Flex from "../../pb_flex/_flex"

import { TableHeaderCell } from "../Components/TableHeaderCell"
import { isChrome } from "../Utilities/BrowserCheck"
import AdvancedTableContext from "../Context/AdvancedTableContext"

type TableHeaderProps = {
  children?: React.ReactNode | React.ReactNode[]
  className?: string
  dark?: boolean
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
    dropdownHeader,
    handleExpandOrCollapse,
    loading,
    table,
    hasAnySubRows,
    showActionsBar,
    selectableRows,
    responsive,
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
    <thead 
        className={classes} 
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
              dropdownHeader && header?.index === 0 ? (
                <Dropdown
                    key={`${header.id}-dropdown`}
                    options={dropdownHeader}
                >
                  <Dropdown.Trigger>
                    <div>
                      <TableHeaderCell
                          enableSorting={enableSorting}
                          enableToggleExpansion={enableToggleExpansion}
                          handleExpandOrCollapse={handleExpandOrCollapse}
                          header={header}
                          headerChildren={children}
                          isPinnedLeft={isPinnedLeft}
                          loading={loading}
                          sortIcon={sortIcon}
                          table={table}
                      />
                    </div>
                  </Dropdown.Trigger>
                  <Dropdown.Container maxWidth="xs">
                    {dropdownHeader.map((option) => (
                      <Dropdown.Option 
                          key={option.value} 
                          onClick={option.handleOnClick}
                          option={option}
                      >
                        <Flex align="start">
                          <Caption text={option.label} />
                        </Flex>
                      </Dropdown.Option>
                    ))}
                  </Dropdown.Container>
                </Dropdown>
              ) : (
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
            )
          })}
        </tr>
      ))}
    </thead>
  )
}