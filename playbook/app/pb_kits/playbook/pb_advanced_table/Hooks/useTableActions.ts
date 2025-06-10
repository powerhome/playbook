import { useCallback, useEffect, useRef, useState } from "react";
import { Row, RowPinningState } from "@tanstack/react-table";
import { GenericObject } from "../../types";
import { updateExpandAndCollapseState } from "../Utilities/ExpansionControlHelpers";

interface UseTableActionsProps {
  table: any;
  expanded: GenericObject;
  setExpanded: (expanded: GenericObject) => void;
  onToggleExpansionClick?: (arg: Row<GenericObject>) => void;
  onRowSelectionChange?: (rowSelection: any) => void;
}

export function useTableActions({
  table,
  expanded,
  setExpanded,
  onToggleExpansionClick,
  onRowSelectionChange
}: UseTableActionsProps) {

  // State to achieve 1 second delay before fetching more rows
  const [bottomReached, setBottomReached] = useState(false)
  const bottomTimeout = useRef<NodeJS.Timeout | null>(null)

  // Handle expand/collapse
  const handleExpandOrCollapse = useCallback(async (row: Row<GenericObject>) => {
    if (onToggleExpansionClick) onToggleExpansionClick(row)
      const updatedExpandedState = await updateExpandAndCollapseState(
        table.getRowModel(),
        expanded,
        row?.parentId,
        undefined
      )

      setExpanded(updatedExpandedState)
  }, [expanded, setExpanded, onToggleExpansionClick, table]);

  // Handle pagination
  const onPageChange = useCallback((page: number) => {
    table.setPageIndex(page - 1);
  }, [table]);

  // Handle scroll detection for infinite scroll/virtualization
  const fetchMoreOnBottomReached = useCallback((
      containerRef: HTMLDivElement | null,
      fetchNextPage: () => void,
      isFetching: boolean,
      totalFetched: number,
      totalDBRowCount: number
  ) => {
    if (!containerRef || isFetching || totalFetched >= totalDBRowCount) return
    const { scrollTop, scrollHeight, clientHeight } = containerRef
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight
    // If user scrolls near bottom, fetch more data after 1 second delay
    if (distanceFromBottom < 50) {
      if (!bottomReached) {
        setBottomReached(true)
        bottomTimeout.current = setTimeout(() => {
          fetchNextPage()
          setBottomReached(false)
        }, 1000)
      }
    } else {
      setBottomReached(false)
      if (bottomTimeout.current) {
        clearTimeout(bottomTimeout.current)
        bottomTimeout.current = null
      }
    }
  },[bottomReached]);

  // Update selection state
  useEffect(() => {
    if (onRowSelectionChange) {
      onRowSelectionChange(table.getState().rowSelection);
    }
  }, [table.getState().rowSelection, onRowSelectionChange]);

  return {
    handleExpandOrCollapse,
    onPageChange,
    fetchMoreOnBottomReached
  };
}