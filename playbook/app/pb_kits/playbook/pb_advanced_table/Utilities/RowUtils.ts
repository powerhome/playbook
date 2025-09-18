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

  return row.getIsSelected() ? "bg-row-selection" : shouldShowExpandedBackground ? "bg-silver" : "bg-white";
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