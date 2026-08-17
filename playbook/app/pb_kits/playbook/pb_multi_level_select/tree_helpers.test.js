import {
  addCheckedAndParentProperty,
  cloneTree,
  filterFormattedDataById,
  findByFilter,
  getAncestorsOfUnchecked,
  getCheckedItems,
  getDefaultCheckedItems,
  getExpandedItems,
  modifyRecursive,
  modifyValue,
  recursiveCheckParent,
  selectedItemsFromTree,
} from "./tree_helpers"

const tree = [
  {
    id: "parent",
    label: "Parent",
    children: [
      { id: "child-a", label: "Child A" },
      { id: "child-b", label: "Child B" },
    ],
  },
]

describe("MultiLevelSelect tree_helpers", () => {
  describe("addCheckedAndParentProperty", () => {
    test("adds parent_id, depth, and checks selected ids", () => {
      const formatted = addCheckedAndParentProperty(cloneTree(tree), ["child-a"])
      expect(formatted[0].parent_id).toBeNull()
      expect(formatted[0].depth).toBe(0)
      expect(formatted[0].children[0].parent_id).toBe("parent")
      expect(formatted[0].children[0].checked).toBe(true)
      expect(formatted[0].children[1].checked).toBe(false)
    })

    test("cascades checked state to children in default multi mode", () => {
      const formatted = addCheckedAndParentProperty(cloneTree(tree), ["parent"])
      expect(formatted[0].checked).toBe(true)
      expect(formatted[0].children[0].checked).toBe(true)
      expect(formatted[0].children[1].checked).toBe(true)
    })

    test("does not cascade when returnAllSelected is true", () => {
      const formatted = addCheckedAndParentProperty(cloneTree(tree), ["parent"], {
        returnAllSelected: true,
      })
      expect(formatted[0].checked).toBe(true)
      expect(formatted[0].children[0].checked).toBe(false)
    })

    test("disables children when parent is disabled", () => {
      const disabledTree = [
        {
          id: "parent",
          label: "Parent",
          disabled: true,
          children: [{ id: "child-a", label: "Child A" }],
        },
      ]
      const formatted = addCheckedAndParentProperty(cloneTree(disabledTree), [])
      expect(formatted[0].disabled).toBe(true)
      expect(formatted[0].children[0].disabled).toBe(true)
    })
  })

  describe("check cascade", () => {
    test("checking a child checks the parent when all siblings are checked", () => {
      let formatted = addCheckedAndParentProperty(cloneTree(tree), ["child-a"])
      const childB = filterFormattedDataById(formatted, "child-b")[0]
      formatted = modifyValue("child-b", cloneTree(formatted), true)
      formatted = recursiveCheckParent(childB, formatted)
      expect(filterFormattedDataById(formatted, "parent")[0].checked).toBe(true)
    })

    test("unchecking a child unchecks ancestors", () => {
      let formatted = addCheckedAndParentProperty(cloneTree(tree), ["parent"])
      const childA = filterFormattedDataById(formatted, "child-a")[0]
      formatted = modifyValue("child-a", cloneTree(formatted), false)
      formatted = getAncestorsOfUnchecked(formatted, childA)
      expect(filterFormattedDataById(formatted, "parent")[0].checked).toBe(false)
    })
  })

  describe("getDefaultCheckedItems", () => {
    test("returns the parent when all selectable children are checked", () => {
      const formatted = addCheckedAndParentProperty(cloneTree(tree), ["parent"])
      const selected = getDefaultCheckedItems(formatted)
      expect(selected.map((item) => item.id)).toEqual(["parent"])
    })

    test("returns only checked children when the parent is not fully checked", () => {
      const formatted = addCheckedAndParentProperty(cloneTree(tree), ["child-a"])
      const selected = getDefaultCheckedItems(formatted)
      expect(selected.map((item) => item.id)).toEqual(["child-a"])
    })
  })

  describe("getCheckedItems", () => {
    test("returns every checked node", () => {
      const formatted = addCheckedAndParentProperty(cloneTree(tree), ["parent"])
      const selected = getCheckedItems(formatted)
      expect(selected.map((item) => item.id)).toEqual([
        "parent",
        "child-a",
        "child-b",
      ])
    })
  })

  describe("findByFilter", () => {
    test("matches nested labels case-insensitively", () => {
      const formatted = addCheckedAndParentProperty(cloneTree(tree), [])
      const matches = findByFilter(formatted, "child a")
      expect(matches.map((item) => item.id)).toEqual(["child-a"])
    })
  })

  describe("getExpandedItems", () => {
    test("includes ancestors of selected ids when showCheckedChildren is true", () => {
      const expanded = getExpandedItems(tree, ["child-a"], true)
      expect(expanded).toContain("parent")
      expect(expanded).toContain("child-a")
    })

    test("honors expanded: true even when showCheckedChildren is false", () => {
      const withExpanded = [
        { id: "parent", label: "Parent", expanded: true, children: [] },
      ]
      const expanded = getExpandedItems(withExpanded, [], false)
      expect(expanded).toEqual(["parent"])
    })
  })

  describe("modifyRecursive", () => {
    test("unchecks every non-disabled node", () => {
      const formatted = addCheckedAndParentProperty(cloneTree(tree), ["parent"])
      modifyRecursive(formatted, false)
      expect(getCheckedItems(formatted)).toEqual([])
    })
  })

  describe("selectedItemsFromTree", () => {
    test("uses default checked items for multi", () => {
      const formatted = addCheckedAndParentProperty(cloneTree(tree), ["parent"])
      const selected = selectedItemsFromTree(formatted, {
        returnAllSelected: false,
        variant: "multi",
      })
      expect(selected.map((item) => item.id)).toEqual(["parent"])
    })

    test("uses the single selected item for single variant", () => {
      const formatted = addCheckedAndParentProperty(cloneTree(tree), ["child-a"], {
        variant: "single",
      })
      const item = filterFormattedDataById(formatted, "child-a")
      const selected = selectedItemsFromTree(formatted, {
        returnAllSelected: false,
        variant: "single",
        singleSelectedItem: { item },
      })
      expect(selected.map((entry) => entry.id)).toEqual(["child-a"])
    })
  })
})
