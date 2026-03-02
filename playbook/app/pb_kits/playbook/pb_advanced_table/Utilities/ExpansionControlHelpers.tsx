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

export const getDescendantRowIds = (row: Row<GenericObject>): string[] => {
  const ids: string[] = []
  for (const sub of row.subRows || []) {
    ids.push(sub.id)
    ids.push(...getDescendantRowIds(sub))
  }
  return ids
}

export const updateExpandAndCollapseState = (
  tableRows: RowModel<GenericObject>,
  expanded: Record<string, boolean>,
  targetParent?: string,
  targetDepth?: number,
  cascadeCollapse?: boolean,
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

  const updatedExpandedState = filterExpandableRows({
    ...(expanded as ExpandedStateObject),
    ...updateExpandedRows,
  });

  if (cascadeCollapse && !isExpandAction) {
    const idsToRemove = new Set<string>();
    for (const row of rowsToToggle) {
      const shouldUpdate =
        targetDepth === undefined ? true : row.depth === targetDepth;
      if (shouldUpdate) {
        getDescendantRowIds(row).forEach((id) => idsToRemove.add(id));
      }
    }
    idsToRemove.forEach((id) => delete updatedExpandedState[id]);
  }

  return updatedExpandedState;
};
