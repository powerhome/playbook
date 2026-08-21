export const cloneTree = (value) => JSON.parse(JSON.stringify(value))

export const filterFormattedDataById = (formattedData, id) => {
  const matched = []
  const recursiveSearch = (data, term) => {
    for (const item of data) {
      if (item.id.toLowerCase() === term.toLowerCase()) {
        matched.push(item)
        return
      }

      if (item.children && item.children.length > 0) {
        recursiveSearch(item.children, term)
      }
    }
  }

  recursiveSearch(formattedData, id)
  return matched
}

export const findByFilter = (formattedData, searchTerm) => {
  const matchedItems = []
  const recursiveSearch = (data, term) => {
    for (const item of data) {
      if (item.label.toLowerCase().includes(term.toLowerCase())) {
        matchedItems.push(item)
      }

      if (item.children) {
        recursiveSearch(item.children, term)
      }
    }
  }

  recursiveSearch(formattedData, searchTerm)
  return matchedItems
}

export const getAncestorsOfUnchecked = (data, item) => {
  if (item.parent_id) {
    const ancestor = filterFormattedDataById(data, item.parent_id)
    ancestor[0].checked = false
    ancestor[0].parent_id && getAncestorsOfUnchecked(data, ancestor[0])
  }
  return data
}

export const getCheckedItems = (data) => {
  const checkedItems = []
  if (!Array.isArray(data)) {
    return
  }
  data.forEach((item) => {
    if (item.checked) {
      checkedItems.push(item)
    }
    if (item.children && item.children.length > 0) {
      const childCheckedItems = getCheckedItems(item.children)
      checkedItems.push(...childCheckedItems)
    }
  })
  return checkedItems
}

export const getDefaultCheckedItems = (treeData) => {
  const checkedDefault = []

  const traverseTree = (items) => {
    if (!Array.isArray(items)) {
      return
    }
    items.forEach((item) => {
      if (item.checked) {
        if (item.children && item.children.length > 0) {
          const selectableChildren = item.children.filter(
            (child) => !child.disabled
          )
          const uncheckedChildren = selectableChildren.filter(
            (child) => !child.checked
          )
          if (uncheckedChildren.length === 0) {
            checkedDefault.push(item)
            return
          }
        } else {
          const parent = items.find(
            (parentItem) => parentItem.id === item.parent_id
          )
          if (!parent || !parent.checked) {
            checkedDefault.push(item)
          }
        }
      }

      if (item.children && item.children.length > 0) {
        traverseTree(item.children)
      }
    })
  }

  traverseTree(treeData)

  return checkedDefault
}

export const recursiveCheckParent = (item, data) => {
  if (item.parent_id !== null) {
    const parent = filterFormattedDataById(data, item.parent_id)
    const allChildrenChecked = parent[0].children.every(
      (child) => child.checked
    )
    if (allChildrenChecked) {
      parent[0].checked = true
      const parentHasParent = parent[0].parent_id !== null
      if (parentHasParent) {
        recursiveCheckParent(parent[0], data)
      }
    }
  }
  return data
}

export const getExpandedItems = (
  treeData,
  selectedIds,
  showCheckedChildren = true
) => {
  const expandedItems = []

  const traverse = (items, ancestors = []) => {
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const itemAncestors = [...ancestors, item]

      if (item.expanded) {
        expandedItems.push(item.id)
      }

      if (showCheckedChildren) {
        if (selectedIds && selectedIds.length && selectedIds.includes(item.id)) {
          expandedItems.push(...itemAncestors.map((ancestor) => ancestor.id))
        }
        if (Array.isArray(item.children)) {
          const hasCheckedChildren = item.children.some(
            (child) => child.checked
          )
          if (hasCheckedChildren) {
            expandedItems.push(...itemAncestors.map((ancestor) => ancestor.id))
          }
        }
      }

      if (Array.isArray(item.children)) {
        traverse(item.children, itemAncestors)
      }
    }
  }

  traverse(treeData)
  return expandedItems
}

export const modifyRecursive = (tree, check) => {
  if (!Array.isArray(tree)) {
    return
  }
  return tree.map((item) => {
    if (!item.disabled) {
      item.checked = check
    }
    item.children = modifyRecursive(item.children, check)
    return item
  })
}

export const addCheckedAndParentProperty = (
  treeData,
  selectedIds,
  {
    returnAllSelected = false,
    variant = "multi",
    parent_id = null,
    depth = 0,
    parentDisabled = false,
    ancestorChecked = false,
  } = {}
) => {
  if (!Array.isArray(treeData)) {
    return
  }
  return treeData.map((item) => {
    const isDisabled =
      item.disabled || (parentDisabled && !returnAllSelected)

    const explicitlySelected = Boolean(
      selectedIds && selectedIds.length && selectedIds.includes(item.id)
    )

    const checked =
      !isDisabled &&
      (explicitlySelected ||
        (ancestorChecked && !returnAllSelected && variant !== "single"))

    const newItem = {
      ...item,
      checked,
      parent_id,
      depth,
      disabled: isDisabled,
    }
    if (newItem.children && newItem.children.length > 0) {
      const cascadeToChildren =
        checked && !returnAllSelected && variant !== "single"

      newItem.children = addCheckedAndParentProperty(
        newItem.children,
        selectedIds,
        {
          returnAllSelected,
          variant,
          parent_id: newItem.id,
          depth: depth + 1,
          parentDisabled: isDisabled,
          ancestorChecked: cascadeToChildren,
        }
      )
    }
    return newItem
  })
}

export const modifyValue = (id, tree, check, variant = "multi") => {
  if (!Array.isArray(tree)) {
    return
  }
  return tree.map((item) => {
    if (item.id != id) {
      item.children = modifyValue(id, item.children, check, variant)
    } else {
      if (!item.disabled) {
        item.checked = check
      }
      if (variant === "single") {
        item.children = modifyRecursive(item.children, !check)
      } else {
        item.children = modifyRecursive(item.children, check)
      }
    }

    return item
  })
}

export const selectedItemsFromTree = (
  formattedData,
  { returnAllSelected, variant, singleSelectedItem }
) => {
  if (returnAllSelected) {
    return getCheckedItems(formattedData) || []
  }
  if (variant === "single") {
    return singleSelectedItem?.item || []
  }
  return getDefaultCheckedItems(formattedData)
}
