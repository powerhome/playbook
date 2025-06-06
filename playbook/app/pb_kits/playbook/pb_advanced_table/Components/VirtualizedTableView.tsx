import React, { useContext, useLayoutEffect, useState, useEffect, useRef } from "react"
import classnames from "classnames"
import { flexRender, Cell } from "@tanstack/react-table"
import { VirtualItem } from "@tanstack/react-virtual"

import { GenericObject } from "../../types"

import { isChrome } from "../Utilities/BrowserCheck"
import { getVirtualizedRowStyle } from "../Utilities/TableContainerStyles"

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
  totalRowCount: number
  // onReachedBottom?: () => void
}

export const VirtualizedTableView = ({
  collapsibleTrail = true,
  subRowHeaders,
  isFetching,
  totalRowCount,
  // onReachedBottom,
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

  // Trying to set a ref to measure the first row of cell widths to match header to it
  // const firstRowRef = useRef<HTMLTableRowElement | null>(null);
  // const getFirstRowCellWidths = () => {
  //   const widths: {[key: string]: string} = {};
  
  //   const cellElements = firstRowRef.current?.querySelectorAll('td') || [];
  
  //   const visibleHeaders = table.getVisibleFlatColumns();
  
  //   cellElements.forEach((cell, index) => {
  //     const header = visibleHeaders[index];
  //     if (header) {
  //       widths[header.id] = `${cell.getBoundingClientRect().width}px`;
  //     }
  //   });
  
  //   return widths;
  // };

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
      // setColumnWidths(getFirstRowCellWidths());
    }, 0);

    return () => clearTimeout(timer);
    // const timer = setTimeout(() => {
    //   requestAnimationFrame(() => {
    //     setColumnWidths(getHeaderCellWidths());
    //     // setColumnWidths(getFirstRowCellWidths())
    //   });
    // }, 100);
    return () => clearTimeout(timer);
  }, [table, selectableRows, hasAnySubRows, sortingState]);

  // Add window resize listener to update widths on window resize
  useEffect(() => {
    // Create debounced version of the width measurement function
    const handleResize = debounce(() => {
      setColumnWidths(getHeaderCellWidths());
      // setColumnWidths(getFirstRowCellWidths());
    }, 0);

    // Add the event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [table, selectableRows, hasAnySubRows]);

  // Explored observer method for a while - linked to anchor row at bottom of file
  // const bottomRef = useRef<HTMLTableRowElement | null>(null);

  // useEffect(() => {
  //   if (!bottomRef.current) return;

  //   const observer = new IntersectionObserver(([entry]) => {
  //     if (entry.isIntersecting) {
  //       const timeout = setTimeout(() => {
  //         if (!isFetching && flattenedItems.length < totalRowCount) {
  //           onReachedBottom?.();
  //         }
  //       }, 1000);
  //       return () => clearTimeout(timeout);
  //     }
  //   }, { threshold: 1 });

  //   observer.observe(bottomRef.current);
  //   return () => observer.disconnect();
  // }, [flattenedItems.length, totalRowCount, isFetching, onReachedBottom]);

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
  const topLevelRowCount = table.getRowModel().flatRows.filter(row => row.depth === 0).length;

  // useEffect(() => {
  //   if (!virtualizer) return;
  
  //   const hasFooter = flattenedItems.some(item => item.type === 'footer');
  //   if (hasFooter) {
  //     virtualizer.measure();
  //   }
  // }, [virtualizer, flattenedItems]);

  return (
    <>
      {virtualItems.map((virtualRow: VirtualItem) => {
        // console.log("Virtual items map:", virtualItems.map(v => flattenedItems[v.index]?.type));
        // console.log("Flattened items map:", flattenedItems.map(item => item.type));
        // console.log("Footer virtual row:", virtualItems.find(v => flattenedItems[v.index]?.type === 'footer'));
        // console.log("Total available count:", totalAvailableCount)
        // console.log("Total row count:", totalRowCount)
        // console.log("Top level row count:", topLevelRowCount)
        const item = flattenedItems[virtualRow.index];
        if (!item) return null;
        // let firstRowCaptured = false;

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
          const rowHasNoChildren = row.original?.children && !row.original.children.length;
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
                    // try {
                    //   if (!firstRowRef.current) {
                    //     firstRowRef.current = node;
                    //   }
                    //   virtualizer.measureElement(node);
                    // } catch (err) {}
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
                // const cellWidth = `${cell.column.getSize()}px`;

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
                      // style={{ width: cellWidth, minWidth: cellWidth, maxWidth: cellWidth }}
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
          // Toggles Footer off once reach end
          // const shouldRenderFooter = topLevelRowCount < totalAvailableCount;
          // if (!shouldRenderFooter) return null;
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

                {/* {isFetching ? "Loading..." : `Showing ${flattenedItems.length - 1} of ${totalAvailableCount} rows`} */}
                {/* {isFetching ? <LoadingInline /> : `Showing ${flattenedItems.length - 1} of ${totalRowCount} rows`} */}
                {/* {isFetching ? "Loading..." : `Showing ${topLevelRowCount} of ${totalAvailableCount} rows`} */}
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
      {/* // Anchor/ref row of height 1px for Observer method when explored
      /* {flattenedItems.length < totalRowCount && (
        <tr ref={bottomRef} style={{ height: 1 }}>
          <td colSpan={table.getAllFlatColumns().length} />
        </tr>
      )} */}
    </>
  );
}

export default VirtualizedTableView;
