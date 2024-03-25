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
  const updateExpandedRows: Record<string, boolean> = {}
  const rows = tableRows.flatRows
  // Variable checks if all rows in a section have same expansion state or not
  let isExpansionConsistent = true
  const areRowsExpanded = new Set<boolean>()

  // Update isExpansionConsistent variable
  for (const row of rows) {
    if (
      targetParent === undefined
        ? row.depth === 0
        : targetParent === row.parentId
    ) {
      areRowsExpanded.add(row.getIsExpanded())
      if (areRowsExpanded.size > 1) {
        isExpansionConsistent = false
        break
      }
    }
  }

  // The if statement runs only for row depth 0, the else statement for the rest
  if (targetParent === undefined) {
    rows.forEach(row => {
      if (row.depth === 0) {
        updateExpandedRows[row.id] = !isExpansionConsistent
          ? true
          : !row.getIsExpanded()
      }
    })
  } else {
    for (const row of rows) {
      if (targetParent === row.parentId) {
        updateExpandedRows[row.id] = !isExpansionConsistent
          ? true
          : !row.getIsExpanded()
      }
    }
  }

  return filterExpandableRows({
    ...(expanded as ExpandedStateObject),
    ...updateExpandedRows,
  })
}