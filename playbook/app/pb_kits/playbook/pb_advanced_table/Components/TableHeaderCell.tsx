import React, { useContext } from "react"
import Flex from "../../pb_flex/_flex"
import { flexRender, Header } from "@tanstack/react-table"

import { SortIconButton } from "./SortIconButton"
import { ToggleIconButton } from "./ToggleIconButton"
import { isChrome } from "../Utilities/helper_functions"
import { DataType } from "../Utilities/types"
import AdvancedTableContext from "../Context/AdvancedTableContext"

type TableHeaderCellProps = {
  headerChildren?: React.ReactNode | React.ReactNode[]
  enableSorting?: boolean
  enableToggleExpansion?: "all" | "header"
  handleExpandOrCollapse?: () => void
  header?: Header<DataType, unknown>
  headerId?: string
  loading?: boolean
  sortIcon?: string | string[]
}

export const TableHeaderCell = ({
  header,
  headerId,
  enableSorting,
  sortIcon,
  headerChildren,
  loading,
  enableToggleExpansion,
  handleExpandOrCollapse,
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

  return (
    <th
        align="right"
        className={`table-header-cells ${isChrome() ? "chrome-styles" : ""}`}
        id={`${
          loading
            ? `loading-${header.id}-${headerId}`
            : `${header.id}-${headerId}`
        }`}
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
            justify={header.index === 0 ? "between" : "right"}
            paddingLeft={loading ? "sm" : ""}
        >
          {header.index === 0 &&
            !loading &&
            (enableToggleExpansion === "all" || "header") && (
              <ToggleIconButton onClick={handleExpandOrCollapse} />
            )}

          {header.index === 0 &&
            loading &&
            (enableToggleExpansion === "all" || "header") && (
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
          >
            <div>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </div>

            {header.index === 0 &&
              header.column.getCanSort() &&
              enableSorting &&
              (loading ? (
                <div className="loading-toggle-icon header-sort-icon" />
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
