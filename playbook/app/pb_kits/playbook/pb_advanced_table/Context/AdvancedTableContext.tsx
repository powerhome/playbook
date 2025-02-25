import React, { createContext, useRef, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

const AdvancedTableContext = createContext<any>({})

export const AdvancedTableProvider = ({ children, ...props }) => {
  const tableContainerRef = useRef(null)

  const table = props.table;

  // Create a flattened data array that includes ALL components for virtualization
  const flattenedItems = useMemo(() => {
    if (!props.enableVirtualization) return [];

    const items = [];
    const subRowHeaders = props.subRowHeaders;
    const inlineRowLoading = props.inlineRowLoading;
    const columnDefinitions = props.columnDefinitions;

    // Process each row and insert special components
    table.getRowModel().rows.forEach((row) => {
      const isFirstChildofSubrow = row.depth > 0 && row.index === 0;

      if (isFirstChildofSubrow && subRowHeaders) {
        items.push({
          type: 'header',
          row: row,
          id: `header-${row.id}`,
        });
      }

      items.push({
        type: 'row',
        row: row,
        id: row.id
      })

      const isExpandable = row.getIsExpanded();
      const rowHasNoChildren = row.original.children && !row.original.children.length ? true : false;
      const isDataLoading = isExpandable && (inlineRowLoading && rowHasNoChildren) && 
        (row.depth < columnDefinitions[0].cellAccessors?.length);

      if (isDataLoading) {
        items.push({
          type: 'loading',
          row: row,
          id: `loading-${row.id}`
        });
      }
    })

    return items;
  }, [
    table.getRowModel().rows,
    props.subRowHeaders,
    props.inlineRowLoading,
    props.columnDefinitions,
  ])

  // Setup virtualizer with flattened data
  const virtualizer = useVirtualizer({
    count: props.enableVirtualization ? flattenedItems.length : 0,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: (index) => {
      if (!props.enableVirtualization) return 0;
      // Estimate size based on item type
      const item = flattenedItems[index];
      if (!item) return 50; // Default row height

      if (item.type === 'header') return 40; // Header height
      if (item.type === 'loading') return 30; // Loading indicator height
      return 50; // Regular row height
    },
    overscan: 10, // Load more items for smoother scrolling
    getItemKey: (index) => flattenedItems[index]?.id || index,
  })

  const contextValue = {
    ...props,
    table,
    tableContainerRef,
    virtualizer: props.enableVirtualization ? virtualizer : null,
    flattenedItems,
  }

  return (
    <AdvancedTableContext.Provider value={contextValue}>
      {children}
    </AdvancedTableContext.Provider>
  )
}

export default AdvancedTableContext
