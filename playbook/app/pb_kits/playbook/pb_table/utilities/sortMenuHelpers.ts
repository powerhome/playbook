export type SortDirection = "asc" | "desc" | string

export type SortMenuItem = {
  active?: boolean
  direction?: SortDirection
  item?: string
  link?: string
}

const isEmptySortMenuItem = (item: SortMenuItem): boolean =>
  Object.keys(item).length === 0

export const isSortingStyle = (sortMenu?: SortMenuItem[]): boolean =>
  Array.isArray(sortMenu) &&
  sortMenu.length > 0 &&
  !(sortMenu.length === 1 && isEmptySortMenuItem(sortMenu[0]))

export const getActiveItem = (sortMenu: SortMenuItem[]): SortMenuItem => {
  let activeItem: SortMenuItem = {} as SortMenuItem
  sortMenu.forEach((item) => {
    if (item.active === true) {
      activeItem = item
    }
  })
  return activeItem
}

export const getSortItems = (sortMenu: SortMenuItem[]): string[] =>
  [...new Set(sortMenu.map((item) => item.item).filter(Boolean))] as string[]

export const getSortItemsFor = (
  sortMenu: SortMenuItem[],
  sortItem: string
): SortMenuItem[] => sortMenu.filter((item) => item.item === sortItem)

export const getActiveOrFirstItem = (items: SortMenuItem[]): SortMenuItem => {
  const activeItem = items.find((item) => item.active === true)
  return activeItem || items[0]
}

export const getNextLink = (
  sortMenu: SortMenuItem[],
  sortItem = ""
): string => {
  const sortMenuFor = sortItem
    ? getSortItemsFor(sortMenu, sortItem)
    : sortMenu

  if (sortMenuFor.every((item) => item.active === false)) {
    return sortMenuFor[0]?.link || ""
  }

  let link = ""
  sortMenuFor.forEach((item, index) => {
    if (item.active === true) {
      const nextIndex = (index + 1) % sortMenuFor.length
      link = sortMenuFor[nextIndex]?.link || ""
    }
  })
  return link
}

export const getSortIcon = (
  direction: SortDirection | undefined,
  active: boolean | undefined
): string => {
  switch (direction) {
    case "asc":
      return active ? "sort-amount-up" : ""
    case "desc":
      return active ? "sort-amount-down" : ""
    default:
      return "arrow-up-arrow-down"
  }
}

export const isDropdownSelect = (
  sortMenu: SortMenuItem[] | undefined,
  colSpan: number | undefined,
  sortDropdown: boolean
): boolean =>
  isSortingStyle(sortMenu) && ((colSpan != null && colSpan > 1) || sortDropdown)
