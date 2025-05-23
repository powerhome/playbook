import React, { useContext, useEffect } from "react"
import classnames from "classnames"
import { flexRender, Row, Cell } from "@tanstack/react-table"

import { GenericObject } from "../../types"
import { isChrome } from "../Utilities/BrowserCheck"

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
    pinnedRows,
    stickyLeftColumn
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

  function PinnedRow({ row, table }: { row: Row<any>; table: any }) {
  return (
    <tr
        style={{
          backgroundColor: 'black',
          position: 'sticky',
          top:
            row.getIsPinned() === 'top'
              ? `36px`
              : undefined,
          bottom:
            row.getIsPinned() === 'bottom'
              ? `${
                  (table.getBottomRows().length - 1 - row.getPinnedIndex()) * 26
                }px`
              : undefined,
        }}
    >
                    {row.getVisibleCells().map((cell: Cell<GenericObject, unknown>, i: number) => {
                const isPinnedLeft = columnPinning.left.includes(cell.column.id);
                const isLastCell = (() => {
                  const parent = cell.column.parent;
                    if (!parent) {
                      const last = row.getVisibleCells().at(-1);
                      return last?.column.id === cell.column.id;
                    }
                  
                    const visibleSiblings = parent.columns.filter(col => col.getIsVisible());
                    return visibleSiblings.at(-1)?.id === cell.column.id;
                   })();

                const { column } = cell;
                return (
                  <td
                      align="right"
                      className={classnames(
                        `${cell.id}-cell position_relative`,
                        isChrome() ? "chrome-styles" : "",
                        isPinnedLeft && 'pinned-left',
                        stickyLeftColumn && stickyLeftColumn.length > 0 && isPinnedLeft && 'sticky-left',
                        isLastCell && 'last-cell',
                      )}
                      key={`${cell.id}-data`}
                      style={{
                        left: isPinnedLeft
                          ? i === 1 //Accounting for set min-width for first column
                            ? '180px'
                            : `${column.getStart("left")}px`
                          : undefined,
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
    </tr>
  )
}

const totalRows = pinnedRows ? table.getCenterRows() : table.getRowModel().rows
  return (
    <>
    {pinnedRows && table.getTopRows().map(row => (
              <PinnedRow key={row.id} 
                  row={row} 
                  table={table} 
              />
    ))}
      {totalRows.map((row: Row<GenericObject>) => {
        const isExpandable = row.getIsExpanded();
        const isFirstChildofSubrow = row.depth > 0 && row.index === 0;
        const rowHasNoChildren = row.original?.children && !row.original.children.length ? true : false;
        const numberOfColumns = table.getAllFlatColumns().length;
        const isDataLoading = isExpandable && (inlineRowLoading && rowHasNoChildren) && (row.depth < columnDefinitions[0]?.cellAccessors?.length);
        const rowBackground = isExpandable && ((!inlineRowLoading && row.getCanExpand()) || (inlineRowLoading && rowHasNoChildren));
        const rowColor = row.getIsSelected() ? "bg-row-selection" : rowBackground ? "bg-silver" : "bg-white";

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

              {row.getVisibleCells().map((cell: Cell<GenericObject, unknown>, i: number) => {
                const isPinnedLeft = columnPinning.left.includes(cell.column.id);
                const isLastCell = (() => {
                  const parent = cell.column.parent;
                    if (!parent) {
                      const last = row.getVisibleCells().at(-1);
                      return last?.column.id === cell.column.id;
                    }
                  
                    const visibleSiblings = parent.columns.filter(col => col.getIsVisible());
                    return visibleSiblings.at(-1)?.id === cell.column.id;
                   })();

                const { column } = cell;
                return (
                  <td
                      align="right"
                      className={classnames(
                        `${cell.id}-cell position_relative`,
                        isChrome() ? "chrome-styles" : "",
                        isPinnedLeft && 'pinned-left',
                        stickyLeftColumn && stickyLeftColumn.length > 0 && isPinnedLeft && 'sticky-left',
                        isLastCell && 'last-cell',
                      )}
                      key={`${cell.id}-data`}
                      style={{
                        left: isPinnedLeft
                          ? i === 1 //Accounting for set min-width for first column
                            ? '180px'
                            : `${column.getStart("left")}px`
                          : undefined,
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
            </tr>

            {/* Display LoadingInline if Row Data is querying and there are no children already */}
            {isDataLoading && (
              <tr key={`${row.id}-row`}>
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
