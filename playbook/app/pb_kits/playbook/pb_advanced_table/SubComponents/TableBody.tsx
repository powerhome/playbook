import React, { useContext } from "react"
import LoadingInline from "../../pb_loading_inline/_loading_inline"
import { flexRender, Row } from "@tanstack/react-table"

import { SubRowHeaderRow } from "../Components/SubRowHeaderRow"
import { LoadingCell } from "../Components/LoadingCell"
import { renderCollapsibleTrail } from "../Components/CollapsibleTrail"
import AdvancedTableContext from "../Context/AdvancedTableContext"
import { isChrome } from "../Utilities/helper_functions"
import { DataType } from "../Utilities/types"

type TableBodyProps = {
  collapsibleTrail?: boolean
  subRowHeaders?: string[]
}

export const TableBody = ({
  collapsibleTrail = true,
  subRowHeaders,
}: TableBodyProps) => {
  const {
    table,
    handleExpandOrCollapse,
    loading,
    enableToggleExpansion,
  } = useContext(AdvancedTableContext)
  return (
    <>
      <tbody>
        {table.getRowModel().rows.map((row: Row<DataType>) => {
          const isExpandable = row.getIsExpanded()
          const isFirstChildofSubrow = row.depth > 0 && row.index === 0
          const rowHasNoChildren = !row.original.children?.length
          const numberOfColumns = table.getAllFlatColumns().length

          return (
            <React.Fragment key={`${row.index}-${row.id}-${row.depth}-row`}>
              {isFirstChildofSubrow && subRowHeaders && (
                <SubRowHeaderRow
                    collapsibleTrail={collapsibleTrail}
                    enableToggleExpansion={enableToggleExpansion}
                    onClick={handleExpandOrCollapse}
                    row={row}
                    subRowHeaders={subRowHeaders}
                    table={table}
                />
              )}

              <tr
                  className={`${isExpandable ? "bg-silver" : "bg-white"} ${
                    row.depth > 0 ? `depth-sub-row-${row.depth}` : ""
                  }`}
                  id={`${row.index}-${row.id}-${row.depth}-row`}
              >
                {row.getVisibleCells().map((cell, i) => (
                  <td
                      align="right"
                      className={`${cell.id}-cell position_relative ${
                      isChrome() ? "chrome-styles" : ""
                      }`}
                      key={`${cell.id}-data`}
                  >
                    {collapsibleTrail &&
                      i === 0 &&
                      row.depth > 0 &&
                      renderCollapsibleTrail(row.depth)}
                    <span id={`${cell.id}-span`}>
                      {loading ? (
                        <LoadingCell />
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Display LoadingInline if getYearData is querying and there are no children already */}
              {isExpandable && rowHasNoChildren && row.depth === 0 ? (
                <tr key={`${row.id}-row`}>
                  <td colSpan={numberOfColumns}>
                    <LoadingInline />
                  </td>
                </tr>
              ) : null}
            </React.Fragment>
          )
        })}
      </tbody>
    </>
  )
}
