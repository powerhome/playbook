import {
  getActiveItem,
  getNextLink,
  getSortIcon,
  isSortingStyle,
  isDropdownSelect,
} from "./sortMenuHelpers"

describe("sortMenuHelpers", () => {
  const territoryMenu = [
    { item: "Territory", link: "?sort=territory_desc", active: false, direction: "desc" },
    { item: "Territory", link: "?sort=territory_asc", active: false, direction: "asc" },
  ]

  test("isSortingStyle is false for the default empty menu", () => {
    expect(isSortingStyle([{}])).toBe(false)
    expect(isSortingStyle(undefined)).toBe(false)
  })

  test("isSortingStyle is true when sort options are present", () => {
    expect(isSortingStyle(territoryMenu)).toBe(true)
  })

  test("getNextLink returns the first link when nothing is active", () => {
    expect(getNextLink(territoryMenu)).toBe("?sort=territory_desc")
  })

  test("getNextLink returns the next link when an item is active", () => {
    expect(
      getNextLink([
        { item: "Territory", link: "?sort=territory_desc", active: true, direction: "desc" },
        { item: "Territory", link: "?sort=territory_asc", active: false, direction: "asc" },
      ])
    ).toBe("?sort=territory_asc")
  })

  test("getActiveItem returns the active sort option", () => {
    expect(
      getActiveItem([
        { item: "Territory", link: "?sort=territory_desc", active: false, direction: "desc" },
        { item: "Territory", link: "?sort=territory_asc", active: true, direction: "asc" },
      ])
    ).toEqual({
      item: "Territory",
      link: "?sort=territory_asc",
      active: true,
      direction: "asc",
    })
  })

  test("getSortIcon returns the unsorted icon by default", () => {
    expect(getSortIcon(undefined, undefined)).toBe("arrow-up-arrow-down")
  })

  test("getSortIcon returns directional icons when active", () => {
    expect(getSortIcon("asc", true)).toBe("sort-amount-up")
    expect(getSortIcon("desc", true)).toBe("sort-amount-down")
  })

  test("isDropdownSelect is true for colspan greater than 1", () => {
    expect(isDropdownSelect(territoryMenu, 2, false)).toBe(true)
  })

  test("isDropdownSelect is true when sortDropdown is true", () => {
    expect(isDropdownSelect(territoryMenu, 1, true)).toBe(true)
  })

  test("isDropdownSelect is false without colspan or sortDropdown", () => {
    expect(isDropdownSelect(territoryMenu, 1, false)).toBe(false)
  })
})
