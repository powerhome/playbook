import { useCallback, useEffect } from 'react';
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

  // Handle expand/collapse
  const handleExpandOrCollapse = useCallback(async (row: Row<GenericObject>) => {
    onToggleExpansionClick && onToggleExpansionClick(row);
    const expandedState = expanded;
    const targetParent = row?.parentId;
    const updatedRows = await updateExpandAndCollapseState(table.getRowModel(), expandedState, targetParent, undefined);
    setExpanded(updatedRows);
  }, [expanded, setExpanded, onToggleExpansionClick, table]);

  // Handle pagination
  const onPageChange = useCallback((page: number) => {
    table.setPageIndex(page - 1);
  }, [table]);

  // Handle scroll detection for infinite scroll/virtualization
  const fetchMoreOnBottomReached = useCallback((
    containerRefElement: HTMLDivElement | null,
    fetchNextPage: () => void,
    isFetching: boolean,
    totalFetched: number,
    totalDBRowCount: number
  ) => {
    if (containerRefElement) {
      const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
      // If user scrolls near bottom, fetch more data
      if (scrollHeight - scrollTop - clientHeight < 500 && !isFetching && totalFetched < totalDBRowCount) {
        fetchNextPage();
      }
    }
  }, []);

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