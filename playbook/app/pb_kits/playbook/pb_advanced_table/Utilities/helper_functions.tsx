import { RowModel } from "@tanstack/react-table"
import { DataType, ExpandedStateObject } from "./types"

const filterExpandableRows = (expandedState: Record<string, boolean>) => {
  for (const expandedRow in expandedState) {
    if (expandedState[expandedRow] === false) {
      delete expandedState[expandedRow]
    }
  }
  return expandedState
}

export const updateExpandAndCollapseState = (
  tableRows: RowModel<DataType>,
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
      row.getCanExpand() &&
      (targetParent === undefined
        ? row.depth === 0
        : targetParent === row.parentId)
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
      if (row.getCanExpand() && targetParent === row.parentId) {
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

//Checking browser. Using this to add classname and css for browser specific issues with table borders
export const isChrome = () => {
  const userAgent = navigator.userAgent.toLowerCase()
  return userAgent.includes("chrome") && !userAgent.includes("edg")
}

// Logic for handling icons related props to allow for string or array of strings
export const displayIcon = (icon: string | string[]) => {
  if (typeof icon === "string") {
    return [icon, icon]
  }
  return icon
}
