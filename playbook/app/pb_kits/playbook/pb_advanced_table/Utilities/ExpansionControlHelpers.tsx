import { RowModel } from "@tanstack/react-table"
import { ExpandedStateObject } from "./types"
import { GenericObject } from "../../types"

const filterExpandableRows = (expandedState: Record<string, boolean>) => {
  for (const expandedRow in expandedState) {
    if (expandedState[expandedRow] === false) {
      delete expandedState[expandedRow]
    }
  }
  return expandedState
}

export const updateExpandAndCollapseState = (
  tableRows: RowModel<GenericObject>,
  expanded: Record<string, boolean>,
  targetParent: string
) => {
  const updateExpandedRows: Record<string, boolean> = {};
  const rows = tableRows.rows;

  let isExpansionConsistent = true;
  const areRowsExpanded = new Set<boolean>();

  for (const row of rows) {
    const shouldBeUpdated = targetParent === undefined ? row.depth === 0 : targetParent === row.parentId;
    
    if (shouldBeUpdated) {
      const isExpanded = row.getIsExpanded();
      areRowsExpanded.add(isExpanded);

      updateExpandedRows[row.id] = !isExpansionConsistent ? true : !isExpanded;

      if (areRowsExpanded.size > 1) {
        isExpansionConsistent = false;
        // If expansion inconsistent, ensure all target rows are set to expand
        for (const key in updateExpandedRows) {
          updateExpandedRows[key] = true;
        }
      }
    }
  }

  return filterExpandableRows({
    ...(expanded as ExpandedStateObject),
    ...updateExpandedRows,
  });
};
