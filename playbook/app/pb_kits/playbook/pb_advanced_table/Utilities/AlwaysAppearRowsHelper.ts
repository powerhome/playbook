import { Row } from "@tanstack/react-table";
import { GenericObject } from "../../types";

/**
 * Inserts rows with alwaysAppear: true into the visible rows array
 * after their parent rows, even when the parent is collapsed.
 * 
 * @param visibleRows - The currently visible rows from table.getRowModel().rows
 * @param allRows - All rows including hidden ones from table.getRowModel().flatRows
 * @param rowStyling - The rowStyling array from props
 * @returns A new array with always-appear rows inserted after their parents
 */
export const insertAlwaysAppearRows = (
  visibleRows: Row<GenericObject>[],
  allRows: Row<GenericObject>[],
  rowStyling: GenericObject[] = []
): Row<GenericObject>[] => {
  // Find rows that should always appear (even when parent is collapsed)
  const alwaysAppearRowIds = rowStyling
    .filter((style: GenericObject) => style.alwaysAppear === true)
    .map((style: GenericObject) => style.rowId) || [];
  
  if (alwaysAppearRowIds.length === 0) {
    return visibleRows;
  }
  
  // Build the rows array, inserting always-appear rows after their parents if needed
  const totalRows = [...visibleRows];
  
  alwaysAppearRowIds.forEach((rowId: string) => {
    const alwaysAppearRow = allRows.find((row: Row<GenericObject>) => row.original?.id === rowId);
    if (!alwaysAppearRow) return;
    
    const parentRow = alwaysAppearRow.getParentRow();
    if (!parentRow) return;
    
    const isParentExpanded = parentRow.getIsExpanded();
    const isAlreadyVisible = visibleRows.some((row: Row<GenericObject>) => row.original?.id === rowId);
    
    // Only insert if parent is collapsed and row is not already visible
    if (!isParentExpanded && !isAlreadyVisible) {
      // Find the index of parent in visible rows
      const parentIndex = visibleRows.findIndex((row: Row<GenericObject>) => row.id === parentRow.id);
      if (parentIndex !== -1) {
        // Insert always-appear row right after its parent
        totalRows.splice(parentIndex + 1, 0, alwaysAppearRow);
      }
    }
  });
  
  return totalRows;
};

