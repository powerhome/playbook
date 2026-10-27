import { Row } from "@tanstack/react-table"
import { GenericObject } from "../../types"

/**
 * Determines the background color class for a row
 */
export const getRowColorClass = (
  row: Row<GenericObject>,
  inlineRowLoading: boolean
): string => {
  const isExpandable = row.getIsExpanded();
  const rowHasNoChildren = row.original?.children && !row.original.children.length ? true : false;

  // Check if row can expand or is currently expanded
  const shouldShowExpandedBackground = isExpandable && (
    (!inlineRowLoading && row.getCanExpand()) ||
    (inlineRowLoading && (rowHasNoChildren || row.getCanExpand()))
  );

  return row.getIsSelected() ? "bg-row-selection" : shouldShowExpandedBackground ? "bg-silver" : "pb-bg-row-white";
}

/**
 * Determines if loading indicator should be shown for a row
 */
export const shouldShowLoadingIndicator = (
  row: Row<GenericObject>,
  inlineRowLoading: boolean,
  cellAccessorsLength: number
): boolean => {
  const isExpandable = row.getIsExpanded();
  const rowHasNoChildren = row.original?.children && !row.original.children.length ? true : false;

  return isExpandable &&
    (inlineRowLoading && rowHasNoChildren) &&
    (row.depth < cellAccessorsLength);
}

export const getRowStyle = (
  rowStyling: GenericObject[] | undefined,
  row: Row<GenericObject>
) => {
  const rowId = row.original?.id ?? row.id
  if (rowId == null) return

  return rowStyling?.find((style: GenericObject) => (
    String(style?.rowId) === String(rowId)
  ))
}

export const getFontWeight = (rowStyle?: GenericObject) => {
  if (rowStyle?.fontWeight === "bold") return 700
  if (rowStyle?.fontWeight === "regular") return 400
}

/**
 * True when this row is the last *visible* sibling under its parent and should
 * show a group separator (expanded parents defer to their last visible descendant).
 *
 * Uses the current row model (`visibleRows`) so sort/filter order is respected —
 * `row.index` / `parent.subRows` stay in original data order.
 */
export const isGroupSeparatorRow = (
  row: Row<GenericObject>,
  visibleRows: Row<GenericObject>[]
): boolean => {
  if (row.depth === 0) return false
  if (!row.getParentRow()) return false

  let lastSiblingId: string | undefined
  for (const candidate of visibleRows) {
    if (candidate.depth === row.depth && candidate.parentId === row.parentId) {
      lastSiblingId = candidate.id
    }
  }
  if (lastSiblingId !== row.id) return false

  if (row.getIsExpanded() && row.subRows.length > 0) return false

  return true
}

/**
 * Left inset (em) for the group separator — aligned with the immediate
 * parent group’s CustomCell label padding (`depth * 1.25em`), so the line
 * starts at that group’s label/trail and does not run through parent gutters.
 */
export const getGroupSeparatorInsetEm = (row: Row<GenericObject>): number => {
  const closedGroupDepth = Math.max(0, row.depth - 1)
  return closedGroupDepth * 1.25
}

/**
 * Creates a virtual item style object for virtualized rows
 */
export const createVirtualItemStyle = (startPosition: number): React.CSSProperties => {
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    transform: `translateY(${startPosition}px)`,
  };
}

/**
 * Calculates padding left based on row depth
 */
export const getDepthPaddingLeft = (depth: number): string => {
  return `${depth === 0 ? 0.5 : (depth * 2)}em`;
}