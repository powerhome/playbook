import React, { useContext } from "react"
import classnames from "classnames"
import { flexRender, Header, Table } from "@tanstack/react-table"

import { GenericObject } from "../../types"

import { GlobalProps } from "../../utilities/globalProps"

import Flex from "../../pb_flex/_flex"
import Checkbox from "../../pb_checkbox/_checkbox"

import { SortIconButton } from "./SortIconButton"
import { ToggleIconButton } from "./ToggleIconButton"

import { isChrome } from "../Utilities/BrowserCheck"

import AdvancedTableContext from "../Context/AdvancedTableContext"

type TableHeaderCellProps = {
  enableSorting?: boolean
  enableToggleExpansion?: "all" | "header" | "none"
  handleExpandOrCollapse?: () => void
  header?: Header<GenericObject, unknown>
  headerChildren?: React.ReactNode | React.ReactNode[]
  isPinnedLeft?: boolean
  loading?: boolean
  sortIcon?: string | string[]
  table?: Table<GenericObject>
} & GlobalProps

export const TableHeaderCell = ({
  enableSorting,
  enableToggleExpansion,
  handleExpandOrCollapse,
  header,
  headerChildren,
  isPinnedLeft = false,
  loading,
  sortIcon,
  table
}: TableHeaderCellProps) => {
  const { sortControl, responsive, selectableRows, hasAnySubRows, showActionsBar } =
    useContext(AdvancedTableContext);

  const toggleSortButton = (event: React.SyntheticEvent) => {
    if (sortControl) {
      const sortIsDesc = header?.column.getIsSorted() === "desc"
      sortIsDesc
        ? sortControl.onChange({ desc: true })
        : sortControl.onChange({ desc: false })
    } else {
      header?.column.getToggleSortingHandler()(event)
    }
  }

  const isLeafColumn =
  header?.column.getLeafColumns().length === 1 &&
  header?.column.getLeafColumns()[0].id === header.column.id

  const isLastHeaderCell =
    header?.column.parent?.columns.at(-1) === header?.column ||
    (header?.colSpan > 1 && header?.column.parent !== undefined);
 
const cellClassName = classnames(
  "table-header-cells",
  `${showActionsBar && "header-cells-with-actions"}`,
  `${isChrome() ? "chrome-styles" : ""}`,
  `${enableSorting ? "table-header-cells-active" : ""}`,
  { "pinned-left": responsive === "scroll" && isPinnedLeft },
   isLastHeaderCell ? "last-header-cell" : ""
); 

const cellId = `${loading ? 
    `loading-${header?.id}`
    : `${header?.id}`
}`

const isToggleExpansionEnabledLoading =
  header?.index === 0 &&
  loading &&
  (enableToggleExpansion === "all" || "header") &&
  enableToggleExpansion !== "none"
  
const isToggleExpansionEnabled =
  header?.index === 0 &&
  !loading &&
  (enableToggleExpansion === "all" || "header") &&
  enableToggleExpansion !== "none"

  let justifyHeader;

  if (header?.index === 0 && hasAnySubRows) {
    justifyHeader = enableSorting ? "between" : "start";
  } else {
    justifyHeader = isLeafColumn ? "end" : "center";
  }
  
  return (
    <th
        align="right"
        className={cellClassName}
        colSpan={header?.colSpan}
        id={cellId}
        key={`${header?.id}-header`}
    >
      {header?.isPlaceholder ? null : headerChildren && header?.index === 0 ? (
        <Flex alignItems="center">
          {headerChildren}
          <div>
            {flexRender(header.column.columnDef.header, header.getContext())}
          </div>
        </Flex>
      ) : (
        <Flex
            alignItems="center"
            justify={justifyHeader}
        >
          {
            selectableRows && header?.index === 0 && hasAnySubRows && (
              <Checkbox
                  checked={table?.getIsAllRowsSelected()}
                  indeterminate={table?.getIsSomeRowsSelected()}
                  onChange={table?.getToggleAllRowsSelectedHandler()}
              />
            )
          }
          {isToggleExpansionEnabled && hasAnySubRows && (
              <ToggleIconButton onClick={handleExpandOrCollapse} />
            )}

          {isToggleExpansionEnabledLoading &&(
              <div className="loading-toggle-icon header-toggle-icon" />
            )}

          <Flex
              className={`${header?.index === 0 &&
                enableSorting &&
                "header-sort-button pb_th_link"}`}
              cursor={header?.index === 0 && enableSorting ? "pointer" : "default"}
              {...(header?.index === 0 &&
                enableSorting && {
                  htmlOptions: {
                    onClick: (event: React.MouseEvent) => toggleSortButton(event),
                    onKeyDown: (event: React.KeyboardEvent) => {
                      if (event.key === "Enter") {
                        toggleSortButton(event)
                      }
                    },
                    tabIndex: 0,
                  },
                })}
              justify={header?.index === 0 && enableSorting ? "between" : "none"}
              paddingLeft={enableSorting ? "xxs" : "xs"}
          >
            <div>
              {flexRender(header?.column.columnDef.header, header?.getContext())}
            </div>

            {header?.index === 0 &&
              header.column.getCanSort() &&
              enableSorting &&
              (loading ? (
                <div className="loading-toggle-icon" />
              ) : (
                <SortIconButton header={header} 
                    sortIcon={sortIcon} 
                />
              ))}
          </Flex>
        </Flex>
      )}
    </th>
  )
}
