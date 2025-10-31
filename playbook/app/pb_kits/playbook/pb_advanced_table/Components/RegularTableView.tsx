import React, { useContext, useEffect } from "react"
import classnames from "classnames"
import { flexRender, Row, Cell } from "@tanstack/react-table"

import { GenericObject } from "../../types"
import { isChrome } from "../Utilities/BrowserCheck"
import { findColumnDefByAccessor } from "../Utilities/ColumnStylingHelper"
import { getRowColorClass, shouldShowLoadingIndicator } from "../Utilities/RowUtils"

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
}: {
  row: Row<GenericObject>
  collapsibleTrail?: boolean
  loading?: boolean | string
  stickyLeftColumn?: string[]
  columnPinning: { left: string[] }
  customRowStyle?: GenericObject
  columnDefinitions?: {[key:string]:any}[]
  isMultiHeaderColumn?: boolean
}) => {
  return (
    <>
      {row.getVisibleCells().map((cell: Cell<GenericObject, unknown>, i: number) => {
        const isPinnedLeft = columnPinning.left.includes(cell.column.id);
        // Add a border to the right of each group of columns for multi-header column tables
        const isLastCell = (() => {
          if (!isMultiHeaderColumn) {
            return false;
          }

          const parent = cell.column.parent;
          if (!parent) {
            const last = row.getVisibleCells().at(-1);
            return last?.column.id === cell.column.id;
          }

          const visibleSiblings = parent.columns.filter(col => col.getIsVisible());
          return visibleSiblings.at(-1)?.id === cell.column.id;
        })();

        const { column } = cell;

        // Find the “owning” colDefinition by accessor. Needed for multi column logic
        const colDef = findColumnDefByAccessor(columnDefinitions ?? [], column.id)
        const cellAlignment = colDef?.columnStyling?.cellAlignment ?? "right"
        const cellFontColor = colDef?.columnStyling?.fontColor
        const paddingValue = colDef?.columnStyling?.cellPadding ?? customRowStyle?.cellPadding
        const paddingClass = paddingValue ? `p_${paddingValue}` : undefined

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
              key={`${cell.id}-data`}
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

  const totalRows = pinnedRows ? table.getCenterRows() : table.getRowModel().rows

  return (
    <>
      {pinnedRows && table.getTopRows().map((row: Row<GenericObject>) => (
        <PinnedRow key={row.id}
            row={row}
        />
      ))}
      {totalRows.map((row: Row<GenericObject>, rowIndex: number) => {
        const isFirstChildofSubrow = row.depth > 0 && row.index === 0;
        const numberOfColumns = table.getAllFlatColumns().length;
        const isFirstRegularRow = rowIndex === 0 && !row.getIsPinned();
        const customRowStyle = rowStyling?.length > 0 && rowStyling?.find((s: GenericObject) => s?.rowId === row.id);

        // Use functions from RowUtils for consistent cell coloring
        const rowColor = getRowColorClass(row, inlineRowLoading || false);
        const isDataLoading = shouldShowLoadingIndicator(row, inlineRowLoading || false, columnDefinitions[0]?.cellAccessors?.length || 0);

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
      })}
    </>
  );
}

export default RegularTableView;
