type SortValue = {
  name: string,
  dir: "asc" | "desc",
}

/**
 * React prop schema source for `yarn generate:ai-metadata`.
 * The Filter implementation lives under ./Filter, but the metadata generator
 * only parses root kit files shaped like `type XProps = { ... }`.
 */
export type FilterProps = {
  background?: boolean,
  double?: boolean,
  filters?: Record<string, unknown>,
  isCollapsed?: boolean,
  maxHeight?: string,
  minWidth?: string,
  onCollapse?: () => void,
  onSortChange?: (value: SortValue[]) => void,
  placement?: "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end",
  popoverProps?: Record<string, unknown>,
  results?: number,
  sortOptions?: Record<string, unknown>,
  sortValue?: SortValue[],
  variant?: string,
}

export { default } from './Filter'
