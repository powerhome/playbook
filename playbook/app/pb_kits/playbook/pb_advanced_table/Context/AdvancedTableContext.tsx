import React, { createContext, useRef, useMemo, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import { Row } from "@tanstack/react-table";
import { GenericObject } from "../../types";
import { getRowHeightEstimate } from '../Utilities/TableContainerStyles';

const AdvancedTableContext = createContext<any>({});

interface FlattenedItem {
    type: 'header' | 'row' | 'loading';
    row: Row<GenericObject>;
    id: string;
}

export const AdvancedTableProvider = ({ children, ...props }: {
    children: React.ReactNode,
    [key: string]: any
}) => {
  // Always initialize refs and state unconditionally, even if not used
  const tableContainerRef = useRef(null);
  const containerRef = props.tableContainerRef || tableContainerRef;

  const table = props.table;
  const isVirtualized = props.virtualizedRows || props.enableVirtualization;

  // Create a flattened data array that includes ALL components for virtualization
  const flattenedItems = useMemo(() => {
    if (!isVirtualized || !table) {
      return [];
    }

    const tableRows = table.getRowModel().rows;
    const items: FlattenedItem[] = [];
    const subRowHeaders = props.subRowHeaders;
    const inlineRowLoading = props.inlineRowLoading;
    const columnDefinitions = props.columnDefinitions;

    // Process each row and insert special components
    tableRows.forEach((row: Row<GenericObject>, index: number) => {
      const isFirstChildofSubrow = row.depth > 0 && row.index === 0;

      if (isFirstChildofSubrow && subRowHeaders) {
        items.push({
          type: 'header',
          row: row,
          id: `header-${row.id}-${index}`,
        });
      }

      items.push({
        type: 'row',
        row: row,
        id: `row-${row.id}-${index}`
      });

      const isExpandable = row.getIsExpanded();
      const rowHasNoChildren = row.original?.children && !row.original.children.length ? true : false;
      const isDataLoading = isExpandable && (inlineRowLoading && rowHasNoChildren) && 
        (row.depth < (columnDefinitions[0]?.cellAccessors?.length || 0));

      if (isDataLoading) {
        items.push({
          type: 'loading',
          row: row,
          id: `loading-${row.id}-${index}`
        });
      }
    });

    return items;
  }, [
    isVirtualized,
    table,
    props.subRowHeaders,
    props.inlineRowLoading,
    props.columnDefinitions,
    // Add dependency on row model hash to refresh when data changes
    table?.getRowModel().rows.length,
    // Important: Add sorting state as a dependency to refresh when sorting changes
    JSON.stringify(table?.getState().sorting || []),
    // Also add expanded state as a dependency
    JSON.stringify(table?.getState().expanded || {}),
  ]);

  // Always initialize the virtualizer, even if we don't use it
  // This satisfies the React hooks rules by ensuring hooks are called unconditionally
  const virtualizer = useVirtualizer({
    count: isVirtualized && flattenedItems.length > 0 ? flattenedItems.length : 0,
    getScrollElement: () => containerRef.current,
    estimateSize: (index) => {
      // Skip if virtualization isn't enabled
      if (!isVirtualized || flattenedItems.length === 0) return 0;

      // Use consistent row height estimates
      const item = flattenedItems[index];
      if (!item) return getRowHeightEstimate('row'); // Default

      return getRowHeightEstimate(item.type);
    },
    overscan: 10, // Load more items for smoother scrolling
    getItemKey: (index) => {
      if (!isVirtualized || flattenedItems.length === 0 || index >= flattenedItems.length) {
        return `item-${index}`;
      }
      return flattenedItems[index]?.id || `item-${index}`;
    },
  });

  // Reset virtualizer scroll position when important state changes
  useEffect(() => {
    if (isVirtualized && virtualizer && table && containerRef.current) {
      // Force recalculation of all virtual items
      virtualizer.measure();

      // Reset scroll position when sorting changes
      containerRef.current.scrollTop = 0;
    }
  }, [
    isVirtualized,
    virtualizer,
    table,
    containerRef,
    JSON.stringify(table?.getState().sorting || []),
    JSON.stringify(table?.getState().expanded || {})
  ]);

  const contextValue = {
    ...props,
    table,
    tableContainerRef: containerRef,
    virtualizer: isVirtualized ? virtualizer : null,
    flattenedItems,
    virtualizedRows: isVirtualized,
    enableVirtualization: isVirtualized
  };

  return (
    <AdvancedTableContext.Provider value={contextValue}>
      {children}
    </AdvancedTableContext.Provider>
  );
};

export default AdvancedTableContext;
