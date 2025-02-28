import React, { useContext } from "react"
import classnames from "classnames"
import { flexRender, Cell } from "@tanstack/react-table"
import { VirtualItem } from "@tanstack/react-virtual"

import { GenericObject } from "../../types"
import { isChrome } from "../Utilities/BrowserCheck"

import LoadingInline from "../../pb_loading_inline/_loading_inline"
import Checkbox from "../../pb_checkbox/_checkbox"

import { SubRowHeaderRow } from "../Components/SubRowHeaderRow"
import { LoadingCell } from "../Components/LoadingCell"
import { renderCollapsibleTrail } from "../Components/CollapsibleTrail"
import { getVirtualizedRowStyle } from "../Utilities/TableContainerStyles"

import AdvancedTableContext from "../Context/AdvancedTableContext"

type VirtualizedTableViewProps = {
  collapsibleTrail?: boolean
  subRowHeaders?: string[]
}

export const VirtualizedTableView = ({
  collapsibleTrail = true,
  subRowHeaders,
}: VirtualizedTableViewProps) => {
  const {
    enableToggleExpansion,
    handleExpandOrCollapse,
    inlineRowLoading,
    loading,
    table,
    selectableRows,
    hasAnySubRows,
    virtualizer,
    flattenedItems,
  } = useContext(AdvancedTableContext)

  const columnPinning = table.getState().columnPinning || { left: [] };
  const sortingState = JSON.stringify(table.getState().sorting || []);

  // Safety check
  if (!virtualizer || !flattenedItems) {
    return (
      <tr>
        <td colSpan={table.getAllFlatColumns().length || 1}>
          No data to display.
        </td>
      </tr>
    );
  }

  // Get virtual items
  let virtualItems: VirtualItem[] = [];
  try {
    virtualItems = virtualizer.getVirtualItems();
  } catch (err) {
    return (
      <tr>
        <td colSpan={table.getAllFlatColumns().length || 1}>
          Error loading virtualized data.
        </td>
      </tr>
    );
  }

  if (!virtualItems.length) {
    return (
      <tr>
        <td colSpan={table.getAllFlatColumns().length || 1}>
          No items to display.
        </td>
      </tr>
    );
  }

  return (
    <>
      {virtualItems.map((virtualRow: VirtualItem) => {
        const item = flattenedItems[virtualRow.index];
        if (!item) return null;

        // Use consistent row styling
        const virtualItemStyle = getVirtualizedRowStyle(virtualRow.start);

        if (item.type === 'header') {
          return (
            <tr
                className="virtualized-table-row virtualized-header-row"
                key={`header-${item.id}-sort-${sortingState}`}
                style={virtualItemStyle}
            >
              <td colSpan={table.getAllFlatColumns().length}>
                <SubRowHeaderRow
                    collapsibleTrail={collapsibleTrail}
                    enableToggleExpansion={enableToggleExpansion}
                    onClick={handleExpandOrCollapse}
                    row={item.row}
                    subRowHeaders={subRowHeaders}
                    table={table}
                />
              </td>
            </tr>
          );
        }

        if (item.type === 'row') {
          const row = item.row;
          const isExpandable = row.getIsExpanded();
          const rowHasNoChildren = row.original?.children && !row.original.children.length ? true : false;
          const rowBackground = isExpandable && ((!inlineRowLoading && row.getCanExpand()) || (inlineRowLoading && rowHasNoChildren));
          const rowColor = row.getIsSelected() ? "bg-row-selection" : rowBackground ? "bg-silver" : "bg-white";

          return (
            <tr
                className={`virtualized-table-row ${rowColor} ${row.depth > 0 ? `depth-sub-row-${row.depth}` : ""}`}
                data-index={virtualRow.index}
                key={`row-${item.id}-sort-${sortingState}`}
                ref={(node) => {
                  if (node) {
                    try {
                      virtualizer.measureElement(node);
                    } catch (err) {
                      // Silent error handling
                    }
                  }
                }}
                style={virtualItemStyle}
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
                const isLastCell = cell.column.parent?.columns?.at(-1)?.id === cell.column.id;

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
                );
              })}
            </tr>
          );
        }

        if (item.type === 'loading') {
          // Render loading indicator
          const row = item.row;
          const numberOfColumns = table.getAllFlatColumns().length;

          return (
            <tr
                className="virtualized-table-row virtualized-loading-row"
                key={`loading-${item.id}-sort-${sortingState}`}
                style={virtualItemStyle}
            >
              <td
                  colSpan={numberOfColumns}
                  style={{ paddingLeft: `${row.depth === 0 ? 0.5 : (row.depth * 2)}em` }}
              >
                <LoadingInline />
              </td>
            </tr>
          );
        }

        return null;
      })}
    </>
  );
}

export default VirtualizedTableView;
