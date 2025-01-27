import React, { useContext } from "react"
import classnames from "classnames"
import { flexRender, Row } from "@tanstack/react-table"

import { GenericObject } from "../../types"

import { buildCss } from "../../utilities/props"
import { globalProps } from "../../utilities/globalProps"
import { isChrome } from "../Utilities/BrowserCheck"

import LoadingInline from "../../pb_loading_inline/_loading_inline"
import Checkbox from "../../pb_checkbox/_checkbox"

import { SubRowHeaderRow } from "../Components/SubRowHeaderRow"
import { LoadingCell } from "../Components/LoadingCell"
import { renderCollapsibleTrail } from "../Components/CollapsibleTrail"

import AdvancedTableContext from "../Context/AdvancedTableContext"

type TableBodyProps = {
  className?: string
  collapsibleTrail?: boolean
  dark?: boolean
  id?: string
  subRowHeaders?: string[]
}

export const TableBody = ({
  className,
  collapsibleTrail = true,
  dark = false,
  id,
  subRowHeaders,
  ...props
}: TableBodyProps) => {

  const {
    columnDefinitions,
    enableToggleExpansion,
    handleExpandOrCollapse,
    isPinnedLeft = false,
    inlineRowLoading,
    loading,
    responsive,
    table,
    selectableRows,
    hasAnySubRows
  } = useContext(AdvancedTableContext)

  const classes = classnames(
    buildCss("pb_advanced_table_body"),
    { 'pinned-left': responsive === "scroll" && isPinnedLeft },
    globalProps(props),
    className
  )

  const columnPinning = table.getState().columnPinning;

  return (
    <>
      <tbody className={classes} 
          id={id}
      >
        {table.getRowModel().rows.map((row: Row<GenericObject>) => {
          const isExpandable = row.getIsExpanded()
          const isFirstChildofSubrow = row.depth > 0 && row.index === 0
          const rowHasNoChildren = row.original.children && !row.original.children.length ? true : false
          const numberOfColumns = table.getAllFlatColumns().length
          const isDataLoading = isExpandable && (inlineRowLoading && rowHasNoChildren) && (row.depth < columnDefinitions[0].cellAccessors?.length)
          const rowBackground = isExpandable && ((!inlineRowLoading && row.getCanExpand()) || (inlineRowLoading && rowHasNoChildren))
          const rowColor = row.getIsSelected() ? "bg-row-selection" : rowBackground ? "bg-silver" : "bg-white"
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
                className={`${rowColor} ${
                  row.depth > 0 ? `depth-sub-row-${row.depth}` : ""
              }`}
                id={`${row.index}-${row.id}-${row.depth}-row`}
            >
              {/* Render custom checkbox column when we want selectableRows for non-expanding tables */}
              {selectableRows && !hasAnySubRows && (
                  <td className="checkbox-cell">
                    <Checkbox
                        checked={row.getIsSelected()}
                        disabled={!row.getCanSelect()}
                        indeterminate={row.getIsSomeSelected()}
                        name={row.id}
                        onChange={row.getToggleSelectedHandler()}
                    />
                  </td>
                )}
              {row.getVisibleCells().map((cell, i) => {
                const isPinnedLeft = columnPinning.left.includes(cell.column.id)
                const isLastCell = cell.column.parent?.columns.at(-1)?.id === cell.column.id

                return (
                  <td
                      align="right"
                      className={classnames(
                        `${cell.id}-cell position_relative`,
                        isChrome() ? "chrome-styles" : "",
                        isPinnedLeft && 'pinned-left',
                        isLastCell && 'last-cell',
                      )}
                      key={`${cell.id}-data`}
                  >
                    {collapsibleTrail && i === 0 && row.depth > 0 && renderCollapsibleTrail(row.depth)}
                    <span id={`${cell.id}-span`}>
                      {loading ? (
                        <LoadingCell />
                      ) : (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      )}
                    </span>
                  </td>
                )
              })}
            </tr>

              {/* Display LoadingInline if Row Data is querying and there are no children already */}
              {isDataLoading ? (
                <tr key={`${row.id}-row`}>
                  <td colSpan={numberOfColumns}
                      style={{ paddingLeft: `${row.depth === 0 ? 0.5 : (row.depth * 2)}em` }}
                  >
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
