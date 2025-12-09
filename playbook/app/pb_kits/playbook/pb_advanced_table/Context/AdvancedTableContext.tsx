import React, { createContext, useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import { Row } from "@tanstack/react-table";
import { GenericObject } from "../../types";
import { getRowHeightEstimate } from '../Utilities/TableContainerStyles';
import { insertAlwaysAppearRows } from '../Utilities/AlwaysAppearRowsHelper';

const AdvancedTableContext = createContext<any>({});

interface FlattenedItem {
    type: 'header' | 'row' | 'loading' | 'footer';
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
  
  // Pinned Row: height calculations for Header and Row
  const headerRef = useRef(null);
  const sampleRowRef = useRef(null);
  
  const [headerHeight, setHeaderHeight] = useState(44);
  const [rowHeight, setRowHeight] = useState(38);

  const measureHeights = useCallback(() => {
    if (headerRef.current) {
      const headerRect = headerRef.current.getBoundingClientRect();
      if (headerRect.height > 0) {
        setHeaderHeight(headerRect.height);
      }
    }
    if (sampleRowRef.current) {
      const rowRect = sampleRowRef.current.getBoundingClientRect();
      if (rowRect.height > 0) {
        setRowHeight(rowRect.height);
      }
    }
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      measureHeights();
    });

    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    if (sampleRowRef.current) {
      resizeObserver.observe(sampleRowRef.current);
    }

    const timeoutId = setTimeout(measureHeights, 100);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(timeoutId);
    };
  }, [measureHeights]);

  useEffect(() => {
    measureHeights();
  }, [table?.getRowModel().rows.length, measureHeights]);


  // Create a flattened data array that includes ALL components for virtualization
  const flattenedItems = useMemo(() => {
    if (!isVirtualized || !table) {
      return [];
    }

    const visibleRows = table.getRowModel().rows;
    const allRows = table.getRowModel().flatRows;
    const rowStyling = props.rowStyling || [];
    
    // Insert always-appear rows after their parents if needed
    const totalRows = insertAlwaysAppearRows(visibleRows, allRows, rowStyling);

    const items: FlattenedItem[] = [];
    const subRowHeaders = props.subRowHeaders;
    const inlineRowLoading = props.inlineRowLoading;
    const columnDefinitions = props.columnDefinitions;

    // Process each row and insert special components
    totalRows.forEach((row: Row<GenericObject>, index: number) => {
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

    const isFetching = props.isFetching || false;
    const shouldAddFooter = table && !isFetching && totalRows.length > 0

    if (shouldAddFooter) {
      items.push({
        type: 'footer',
        row: {} as Row<GenericObject>,
        id: `footer-row`,
      });
    }

    return items;
  }, [
    isVirtualized,
    table,
    props.subRowHeaders,
    props.inlineRowLoading,
    props.columnDefinitions,
    props.rowStyling,
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
      virtualizer.setOptions({
        ...virtualizer.options,
        count: flattenedItems.length,
      });
      virtualizer.measure();
    }
  }, [
    isVirtualized,
    virtualizer,
    table,
    containerRef,
    JSON.stringify(table?.getState().sorting || []),
    JSON.stringify(table?.getState().expanded || {}),
    flattenedItems.length,
  ]);

  const contextValue = {
    ...props,
    table,
    tableContainerRef: containerRef,
    virtualizer: isVirtualized ? virtualizer : null,
    flattenedItems,
    virtualizedRows: isVirtualized,
    enableVirtualization: isVirtualized,
    rowPinning: props.rowPinning,
    setRowPinning: props.setRowPinning,
    keepPinnedRows: props.keepPinnedRows,
    headerHeight,
    rowHeight,
    headerRef,
    sampleRowRef,
    measureHeights,
  };

  return (
    <AdvancedTableContext.Provider value={contextValue}>
      {children}
    </AdvancedTableContext.Provider>
  );
};

export default AdvancedTableContext;
