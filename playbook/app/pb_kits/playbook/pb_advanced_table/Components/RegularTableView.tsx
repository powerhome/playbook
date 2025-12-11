import React, { useContext, useEffect } from "react"
import classnames from "classnames"
import { flexRender, Row, Cell } from "@tanstack/react-table"

import { GenericObject } from "../../types"
import { isChrome } from "../Utilities/BrowserCheck"
import { findColumnDefByAccessor } from "../Utilities/ColumnStylingHelper"
import { getRowColorClass, shouldShowLoadingIndicator } from "../Utilities/RowUtils"
import { insertAlwaysAppearRows } from "../Utilities/AlwaysAppearRowsHelper"

import LoadingInline from "../../pb_loading_inline/_loading_inline"
import Checkbox from "../../pb_checkbox/_checkbox"

import { SubRowHeaderRow } from "../Components/SubRowHeaderRow"
import { LoadingCell } from "../Components/LoadingCell"
import { renderCollapsibleTrail } from "../Components/CollapsibleTrail"

import AdvancedTableContext from "../Context/AdvancedTableContext"

type RegularTableViewProps = {
  collapsibleTrail?: boolean
  subRowHeaders?: string[]
}

// Helper function for Table Rendering
const TableCellRenderer = ({
  row,
  collapsibleTrail = true,
  loading = false,
  stickyLeftColumn,
  columnPinning,
  customRowStyle,
  columnDefinitions,
  isMultiHeaderColumn = false,
  activeRowSpans = {},
  onRowSpanStart,
}: {
  row: Row<GenericObject>
  collapsibleTrail?: boolean
  loading?: boolean | string
  stickyLeftColumn?: string[]
  columnPinning: { left: string[] }
  customRowStyle?: GenericObject
  columnDefinitions?: {[key:string]:any}[]
  isMultiHeaderColumn?: boolean
  activeRowSpans?: Record<string, number>
  onRowSpanStart?: (columnId: string, rowSpan: number) => void
}) => {
  const visibleCells = row.getVisibleCells()
  let cellsToSkip = 0

  return (
    <>
      {visibleCells.map((cell: Cell<GenericObject, unknown>, i: number) => {
        // Skip cells that are covered by a previous cell's colSpan
        if (cellsToSkip > 0) {
          cellsToSkip--
          return null
        }

        // Skip cells that are covered by a previous row's rowSpan
        const columnId = cell.column.id
        if (activeRowSpans[columnId] !== undefined && activeRowSpans[columnId] > 0) {
          // This cell is covered by a previous row's rowSpan, skip it
          // The count will be decremented in the parent component
          return null
        }

        const isPinnedLeft = columnPinning.left.includes(cell.column.id);
        // Add a border to the right of each group of columns for multi-header column tables
        const isLastCell = (() => {
          if (!isMultiHeaderColumn) {
            return false;
          }

          const parent = cell.column.parent;
          if (!parent) {
            const last = visibleCells.at(-1);
            return last?.column.id === cell.column.id;
          }

          const visibleSiblings = parent.columns.filter(col => col.getIsVisible());
          return visibleSiblings.at(-1)?.id === cell.column.id;
        })();

        const { column } = cell;

        // Find the "owning" colDefinition by accessor. Needed for multi column logic
        const colDef = findColumnDefByAccessor(columnDefinitions ?? [], column.id)
        const cellAlignment = colDef?.columnStyling?.cellAlignment ?? "right"
        const cellFontColor = colDef?.columnStyling?.fontColor
        const paddingValue = colDef?.columnStyling?.cellPadding ?? customRowStyle?.cellPadding
        const paddingClass = paddingValue ? `p_${paddingValue}` : undefined

        // Calculate colSpan: can be a number or a function that receives (row, value) and returns a number
        // If colSpan is 0, the cell will not be rendered (returns null)
        const cellValue = cell.getValue()
        let colSpan: number | undefined = undefined
        if (colDef?.colSpan !== undefined) {
          if (typeof colDef.colSpan === 'function') {
            colSpan = colDef.colSpan(row.original, cellValue)
          } else if (typeof colDef.colSpan === 'number') {
            colSpan = colDef.colSpan
          }
          
          // If colSpan is 0, don't render this cell
          if (colSpan === 0) {
            return null
          }
          
          // Set cellsToSkip to skip the next (colSpan - 1) cells
          if (colSpan && colSpan > 1) {
            cellsToSkip = colSpan - 1
          }
        }

        // Calculate rowSpan: can be a number or a function that receives (row, value) and returns a number
        // If rowSpan is 0, the cell will not be rendered (returns null)
        let rowSpan: number | undefined = undefined
        if (colDef?.rowSpan !== undefined) {
          if (typeof colDef.rowSpan === 'function') {
            rowSpan = colDef.rowSpan(row.original, cellValue)
          } else if (typeof colDef.rowSpan === 'number') {
            rowSpan = colDef.rowSpan
          }
          
          // If rowSpan is 0, don't render this cell
          if (rowSpan === 0) {
            return null
          }
          
          // Track rowSpan for subsequent rows (rowSpan - 1 because current row counts as 1)
          if (rowSpan && rowSpan > 1 && onRowSpanStart) {
            onRowSpanStart(columnId, rowSpan - 1)
          }
        }

        return (
          <td
              align={cellAlignment}
              className={classnames(
                `${cell.id}-cell position_relative`,
                isChrome() ? "chrome-styles" : "",
                isPinnedLeft && 'pinned-left',
                stickyLeftColumn && stickyLeftColumn.length > 0 && isPinnedLeft && 'sticky-left',
                isLastCell && 'last-cell',
                paddingClass
              )}
              colSpan={colSpan && colSpan > 1 ? colSpan : undefined}
              key={`${cell.id}-data`}
              rowSpan={rowSpan && rowSpan > 1 ? rowSpan : undefined}
              style={{
                left: isPinnedLeft
                  ? i === 1 // Accounting for set min-width for first column
                    ? '180px'
                    : `${column.getStart("left")}px`
                  : undefined,
                  backgroundColor: i === 0 && customRowStyle?.backgroundColor,
                  color: cellFontColor || customRowStyle?.fontColor,
            }}
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
        );
      })}
    </>
  )
}

export const RegularTableView = ({
  collapsibleTrail = true,
  subRowHeaders,
}: RegularTableViewProps) => {
  const {
    enableToggleExpansion,
    handleExpandOrCollapse,
    inlineRowLoading,
    loading,
    table,
    selectableRows,
    hasAnySubRows,
    stickyLeftColumn,
    pinnedRows,
    headerHeight,
    rowHeight,
    rowStyling = [],
    sampleRowRef,
  } = useContext(AdvancedTableContext)


  useEffect(() => {
    if (stickyLeftColumn && Array.isArray(stickyLeftColumn)) {
      stickyLeftColumn.forEach((columnId) => {
        const column = table.getColumn(columnId);
        if (column && column.getCanPin()) {
          column.pin('left');
        }
      });
    }
  },[stickyLeftColumn, table]);

  const columnPinning = table.getState().columnPinning || { left: [] };
  const columnDefinitions = table.options.meta?.columnDefinitions || [];
  const isMultiHeaderColumn = columnDefinitions.some(
    (obj: Record<string, unknown>) => "columns" in obj
  );

  // Row pinning
  function PinnedRow({ row }: { row: Row<any> }) {
    const customRowStyle = rowStyling?.length > 0 && rowStyling?.find((s: GenericObject) => s?.rowId === row.id);
    return (
      <tr
          className={classnames(
            `pinned-row`,
          )}
          style={{
            backgroundColor: customRowStyle?.backgroundColor ? customRowStyle?.backgroundColor : 'white',
            color: customRowStyle?.fontColor,
            position: 'sticky',
            top:
              row.getIsPinned() === 'top'
                  ? `${row.getPinnedIndex() * rowHeight + headerHeight}px`
                  : undefined,
            zIndex: '3'
          }}
      >
        <TableCellRenderer
            collapsibleTrail={collapsibleTrail}
            columnDefinitions={columnDefinitions}
            columnPinning={columnPinning}
            customRowStyle={customRowStyle}
            isMultiHeaderColumn={isMultiHeaderColumn}
            loading={loading}
            row={row}
            stickyLeftColumn={stickyLeftColumn}
        />
      </tr>
    )
  }

  const visibleRows = pinnedRows ? table.getCenterRows() : table.getRowModel().rows
  const allRows = table.getRowModel().flatRows
  
  // Insert always-appear rows after their parents if needed
  const totalRows = insertAlwaysAppearRows(visibleRows, allRows, rowStyling)

  return (
    <>
      {pinnedRows && table.getTopRows().map((row: Row<GenericObject>) => (
        <PinnedRow key={row.id}
            row={row}
        />
      ))}
      {(() => {
        // Track active rowSpans across rows (keyed by column ID)
        const activeRowSpans: Record<string, number> = {}
        
        const handleRowSpanStart = (columnId: string, remainingRows: number) => {
          activeRowSpans[columnId] = remainingRows
        }
        
        return (
          totalRows.map((row: Row<GenericObject>, rowIndex: number) => {
          const isFirstChildofSubrow = row.depth > 0 && row.index === 0;
          const numberOfColumns = table.getAllFlatColumns().length;
          const isFirstRegularRow = rowIndex === 0 && !row.getIsPinned();
          const customRowStyle = rowStyling?.length > 0 && rowStyling?.find((s: GenericObject) => s?.rowId === row.id);

          // Use functions from RowUtils for consistent cell coloring
          const rowColor = getRowColorClass(row, inlineRowLoading || false);
          const isDataLoading = shouldShowLoadingIndicator(row, inlineRowLoading || false, columnDefinitions[0]?.cellAccessors?.length || 0);
          
          // Create a snapshot of current rowSpans for this row (before processing)
          const currentRowSpans = { ...activeRowSpans }
          
          // Decrement rowSpans for columns that had active rowSpans (cells were skipped)
          // This happens after the row is rendered
          const columnsToDecrement = Object.keys(currentRowSpans).filter(
            colId => currentRowSpans[colId] > 0
          )
          columnsToDecrement.forEach(columnId => {
            activeRowSpans[columnId]--
            if (activeRowSpans[columnId] <= 0) {
              delete activeRowSpans[columnId]
            }
          })

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
                  className={`${rowColor} ${row.depth > 0 ? `depth-sub-row-${row.depth}` : ""}`}
                  id={`${row.index}-${row.id}-${row.depth}-row`}
                  ref={isFirstRegularRow ? sampleRowRef : null}
                  style={{backgroundColor: customRowStyle?.backgroundColor, color: customRowStyle?.fontColor}}
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
                <TableCellRenderer
                    activeRowSpans={currentRowSpans}
                    collapsibleTrail={collapsibleTrail}
                    columnDefinitions={columnDefinitions}
                    columnPinning={columnPinning}
                    customRowStyle={customRowStyle}
                    isMultiHeaderColumn={isMultiHeaderColumn}
                    loading={loading}
                    onRowSpanStart={handleRowSpanStart}
                    row={row}
                    stickyLeftColumn={stickyLeftColumn}
                />
              </tr>

            {/* Display LoadingInline if Row Data is querying and there are no children already */}
            {isDataLoading && (
              <tr key={`${row.id}-loading-row`}>
                <td colSpan={numberOfColumns}
                    style={{ paddingLeft: `${row.depth === 0 ? 0.5 : (row.depth * 2)}em` }}
                >
                  <LoadingInline />
                </td>
              </tr>
            )}
          </React.Fragment>
        );
          })
        )
      })()}
    </>
  );
}

export default RegularTableView;
