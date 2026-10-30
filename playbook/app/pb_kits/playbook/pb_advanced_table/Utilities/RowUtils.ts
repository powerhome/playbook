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

// Matches the `left` of the nth collapsible-trail (see CollapsibleTrail.tsx).
const getCollapsibleTrailLeftEm = (trailIndex: number): number =>
  trailIndex * 1.0 + (trailIndex > 1 ? (trailIndex - 1) * 0.25 : 0)

/**
 * One O(n) pass over the full visible row model → Map of row id to its
 * `--group-separator-inset` (em). Call once (and memoize) for the whole table —
 * do not rebuild per pinned section, or a pinned non-last sibling can look like
 * a last sibling and invent a second separator.
 *
 * A row closes every group between its depth and the next visible row's depth
 * (so expanded parents defer to their last visible descendant, and sort/filter
 * is respected). One stroke is drawn, inset to the outermost closed group:
 * year-level → 0 / full-bleed, otherwise that group's collapsible-trail.
 */
export const buildGroupSeparatorInsets = (
  visibleRows: Row<GenericObject>[]
): Map<string, number> => {
  const insets = new Map<string, number>()

  visibleRows.forEach((row, index) => {
    if (row.depth === 0) return
    const nextDepth = visibleRows[index + 1]?.depth ?? 0
    if (nextDepth >= row.depth) return
    insets.set(row.id, nextDepth === 0 ? 0 : getCollapsibleTrailLeftEm(nextDepth + 1))
  })
  return insets
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