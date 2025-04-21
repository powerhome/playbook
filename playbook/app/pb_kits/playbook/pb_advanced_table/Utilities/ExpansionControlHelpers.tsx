import { RowModel, Row } from "@tanstack/react-table"
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
  targetParent?: string,
  targetDepth?: number,
) => {
  const updateExpandedRows: Record<string, boolean> = {};
  const rows = targetDepth !== undefined ? tableRows.flatRows : tableRows.rows;

  const rowsToToggle: Row<GenericObject>[] = [];

  for (const row of rows) {
    const shouldBeUpdated =
      targetDepth !== undefined
        ? row.depth <= targetDepth
        : targetParent === undefined
        ? row.depth === 0
        : targetParent === row.parentId;

    if (shouldBeUpdated) {
      rowsToToggle.push(row);
    }
  }

  // Check if we are expanding or collapsing
  const anyCollapsed = rowsToToggle.some((row) => !row.getIsExpanded());
  const isExpandAction = anyCollapsed;

  
  for (const row of rowsToToggle) {
    const shouldUpdate =
      isExpandAction || targetDepth === undefined
        ? true
        : row.depth === targetDepth;

    if (shouldUpdate) {
      updateExpandedRows[row.id] = isExpandAction;
    }
  }

  return filterExpandableRows({
    ...(expanded as ExpandedStateObject),
    ...updateExpandedRows,
  });
};
