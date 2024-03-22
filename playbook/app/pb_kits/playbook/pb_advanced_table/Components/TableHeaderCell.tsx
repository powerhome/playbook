import React, { useContext } from "react"
import classnames from "classnames"
import { flexRender, Header } from "@tanstack/react-table"

import { GenericObject } from "../../types"

import { GlobalProps } from "../../utilities/globalProps"

import Flex from "../../pb_flex/_flex"

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
  loading?: boolean
  sortIcon?: string | string[]
} & GlobalProps

export const TableHeaderCell = ({
  enableSorting,
  enableToggleExpansion,
  handleExpandOrCollapse,
  header,
  headerChildren,
  loading,
  sortIcon,
}: TableHeaderCellProps) => {
  const { sortControl } = useContext(AdvancedTableContext)

  const toggleSortButton = (event: React.SyntheticEvent) => {
    if (sortControl) {
      const sortIsDesc = header.column.getIsSorted() === "desc"
      sortIsDesc
        ? sortControl.onChange({ desc: true })
        : sortControl.onChange({ desc: false })
    } else {
      header.column.getToggleSortingHandler()(event)
    }
  }

const cellClassName = classnames("table-header-cells", 
  `${isChrome() ? "chrome-styles" : ""}`, 
  `${enableSorting ? "table-header-cells-active" : ""}`
)

const cellId = `${loading ? 
    `loading-${header.id}`
    : `${header.id}`
}`

const isToggleExpansionEnabledLoading =
  header.index === 0 &&
  loading &&
  (enableToggleExpansion === "all" || "header") &&
  enableToggleExpansion !== "none"
  
const isToggleExpansionEnabled =
  header.index === 0 &&
  !loading &&
  (enableToggleExpansion === "all" || "header") &&
  enableToggleExpansion !== "none"

  return (
    <th
        align="right"
        className={cellClassName}
        id={cellId}
        key={`${header.id}-header`}
    >
      {header.isPlaceholder ? null : headerChildren && header.index === 0 ? (
        <Flex alignItems="center">
          {headerChildren}
          <div>
            {flexRender(header.column.columnDef.header, header.getContext())}
          </div>
        </Flex>
      ) : (
        <Flex
            alignItems="center"
            justify={header.index === 0 && enableSorting ? "between" : header.index === 0 && !enableSorting ? "start" : "end"}
        >
          {isToggleExpansionEnabled && (
              <ToggleIconButton onClick={handleExpandOrCollapse} />
            )}

          {isToggleExpansionEnabledLoading &&(
              <div className="loading-toggle-icon header-toggle-icon" />
            )}

          <Flex
              className={`${header.index === 0 &&
                enableSorting &&
                "header-sort-button pb_th_link"}`}
              cursor={header.index === 0 && enableSorting ? "pointer" : "default"}
              {...(header.index === 0 &&
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
              justify={header.index === 0 && enableSorting ? "between" : "none"}
              paddingLeft={enableSorting ? "xxs" : "xs"}
          >
            <div>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </div>

            {header.index === 0 &&
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
