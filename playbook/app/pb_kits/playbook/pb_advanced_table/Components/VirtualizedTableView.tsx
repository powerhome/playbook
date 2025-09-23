import React, { useContext, useLayoutEffect, useState, useEffect, useRef } from "react"
import classnames from "classnames"
import { flexRender, Cell, Row } from "@tanstack/react-table"
import { VirtualItem } from "@tanstack/react-virtual"

import { GenericObject } from "../../types"

import { isChrome } from "../Utilities/BrowserCheck"
import { getVirtualizedRowStyle } from "../Utilities/TableContainerStyles"
import { getRowColorClass } from "../Utilities/RowUtils"

import LoadingInline from "../../pb_loading_inline/_loading_inline"
import Checkbox from "../../pb_checkbox/_checkbox"
import Detail from "../../pb_detail/_detail"
import Flex from "../../pb_flex/_flex"

import { SubRowHeaderRow } from "../Components/SubRowHeaderRow"
import { LoadingCell } from "../Components/LoadingCell"
import { renderCollapsibleTrail } from "../Components/CollapsibleTrail"

import AdvancedTableContext from "../Context/AdvancedTableContext"

type VirtualizedTableViewProps = {
  collapsibleTrail?: boolean
  subRowHeaders?: string[]
  isFetching: boolean
}

export const VirtualizedTableView = ({
  collapsibleTrail = true,
  subRowHeaders,
  isFetching,
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
    totalAvailableCount,
  } = useContext(AdvancedTableContext)

  const columnPinning = table.getState().columnPinning || { left: [] };
  const sortingState = JSON.stringify(table.getState().sorting || []);

  // Store column widths extracted from header
  const [columnWidths, setColumnWidths] = useState<{[key: string]: string}>({});

  // Function to get header cell widths
  const getHeaderCellWidths = () => {
    const widths: {[key: string]: string} = {};

    // Get all header cells
    const headerCells = document.querySelectorAll('.table-header-cells, .table-header-cells-custom');

    // If checkbox is present in header
    if (selectableRows && !hasAnySubRows && headerCells.length > 0) {
      widths['checkbox'] = `${headerCells[0].getBoundingClientRect().width}px`;
    }

    // Process regular header cells
    table.getFlatHeaders().forEach((header: any, index: number) => {
      // Adjust index if checkbox column exists
      const headerIndex = (selectableRows && !hasAnySubRows) ? index + 1 : index;

      if (headerCells[headerIndex]) {
        const width = headerCells[headerIndex].getBoundingClientRect().width;
        widths[header.id] = `${width}px`;
      }
    });

    return widths;
  };

  // Debounce function to prevent too many updates during resize
  const debounce = <T extends (...args: any[]) => any>(func: T, wait: number): ((...args: Parameters<T>) => void) => {
    let timeout: ReturnType<typeof setTimeout>;
    return function executedFunction(...args: Parameters<T>) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Update column widths when component mounts and when sorting changes
  useLayoutEffect(() => {
    // Apply widths after a small delay to ensure header is rendered
    const timer = setTimeout(() => {
      setColumnWidths(getHeaderCellWidths());
    }, 0);

    return () => clearTimeout(timer);
  }, [table, selectableRows, hasAnySubRows, sortingState]);

  // Add window resize listener to update widths on window resize
  useEffect(() => {
    // Create debounced version of the width measurement function
    const handleResize = debounce(() => {
      setColumnWidths(getHeaderCellWidths());
    }, 0);

    // Add the event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [table, selectableRows, hasAnySubRows]);

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
  const virtualItems: VirtualItem[] = virtualizer.getVirtualItems?.() || [];
  if (!virtualItems.length) {
    return (
      <tr>
        <td colSpan={table.getAllFlatColumns().length || 1}>
          No items to display.
        </td>
      </tr>
    );
  }

  // Establish # of Parent Rows (so that Footer count does not include every single row)
  const topLevelRowCount = table.getRowModel().flatRows.filter((row: Row<GenericObject>) => row.depth === 0).length;

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

          // Use the utility function to get consistent row color
          const rowColor = getRowColorClass(row, inlineRowLoading || false);

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
                <td
                    className="checkbox-cell"
                    style={{ width: columnWidths['checkbox'] || 'auto' }}
                >
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
                const cellWidth = columnWidths[cell.column.id] || 'auto';

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
                      style={{ width: cellWidth }}
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

        if (item.type === 'footer') {
          // Render footer
          return (
            <tr
                className="virtualized-table-row virtualized-footer"
                key={`footer-row`}
                style={virtualItemStyle}
            >
              <td colSpan={table.getAllFlatColumns().length}>
                <Flex align="center"
                    justify="center"
                >

                {isFetching ? (
                  <LoadingInline />
                ) : (
                  <Detail text={`Showing ${topLevelRowCount} of ${totalAvailableCount} rows`} />
                )}
                </Flex>
              </td>
            </tr>
          )
        }

        return null;
      })}
    </>
  );
}

export default VirtualizedTableView;
