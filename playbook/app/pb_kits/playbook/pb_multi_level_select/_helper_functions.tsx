//function for unchecking items in formattedData
export const unCheckIt = (
  formattedData: { [key: string]: any }[],
  id: string
) => {
  formattedData.map((item: { [key: string]: any }) => {
    if (item.id === id && item.checked) {
      item.checked = false;
    }
    if (item.children && item.children.length > 0) {
      unCheckIt(item.children, id);
    }
    return item;
  });
};

//function to retrieve all ancestors of unchecked item and set checked to false
export const getAncestorsOfUnchecked = (
  formattedData: { [key: string]: any }[],
  item: { [key: string]: any }
) => {
  if (item.parent_id) {
    const ancestors = filterFormattedDataById(formattedData, item.parent_id);
    ancestors[0].checked = false;

    if (ancestors[0].parent_id) {
      getAncestorsOfUnchecked(formattedData, ancestors[0]);
    }
  }
};

//recursively check all child and grandchild items if parent checked
export const checkedRecursive = (item: { [key: string]: any }) => {
  if (!item.checked) {
    item.checked = true;
  }
  if (item.children && item.children.length > 0) {
    item.children.forEach((childItem: { [key: string]: any }) => {
      checkedRecursive(childItem);
    });
  }
};

//recursively uncheck all child and grandchild items if parent unchecked
export const unCheckedRecursive = (item: { [key: string]: any }) => {
  if (item.checked) {
    item.checked = false;
  }
  if (item.children && item.children.length > 0) {
    item.children.forEach((childItem: { [key: string]: any }) => {
      unCheckedRecursive(childItem);
    });
  }
};

//function is going over formattedData and returning all objects that match the
//id of the clicked item from the dropdown
export const filterFormattedDataById = (
  formattedData: { [key: string]: any }[],
  id: string
) => {
  const matched: { [key: string]: any }[] = [];
  const recursiveSearch = (data: { [key: string]: any }[], term: string) => {
    for (const item of data) {
      if (item.id.toLowerCase() === (term.toLowerCase())) {
        matched.push(item);
      }

      if (item.children && item.children.length > 0) {
        recursiveSearch(item.children, term);
      }
    }
  };

  recursiveSearch(formattedData, id);
  return matched;
};

export const findByFilter = (
  formattedData: { [key: string]: any }[],
  searchTerm: string
) => {
  const matchedItems: { [key: string]: any }[] = [];
  const recursiveSearch = (data: { [key: string]: any }[], term: string) => {
    for (const item of data) {
      if (item.label.toLowerCase().includes(term.toLowerCase())) {
        matchedItems.push(item);
      }

      if (item.children) {
        recursiveSearch(item.children, term);
      }
    }
  };

  recursiveSearch(formattedData, searchTerm);
  return matchedItems;
};

//function to get all items with checked = true
export const getCheckedItems = (
  data: { [key: string]: any }[]
): { [key: string]: any }[] => {
  const checkedItems: { [key: string]: any }[] = [];
  if (!Array.isArray(data)) {
    return;
  }
  data.forEach((item: { [key: string]: any }) => {
    if (item.checked) {
      checkedItems.push(item);
    }
    if (item.children && item.children.length > 0) {
      const childCheckedItems = getCheckedItems(item.children);
      checkedItems.push(...childCheckedItems);
    }
  });
  return checkedItems;
};

export const getChildIds = (
  item: { [key: string]: any },
  defaultArray: { [key: string]: any }[]
) => {
  let childIds: string[] = [];
  item.children.forEach((child: { [key: string]: any }) => {
    childIds.push(child.id);
    if (child.children && child.children.length > 0) {
      const childChildIds = getChildIds(child, defaultArray);
      childIds.push(...childChildIds);
    }
  });
  return childIds;
};

export const updateReturnItems = (newChecked: { [key: string]: any }[]) => {
  const updatedCheckedItems: { [key: string]: any }[] = [];
  for (const item of newChecked) {
    if (item.children && item.children.length > 0) {
      const allChildrenChecked = item.children.every(
        (child: { [key: string]: any }) => child.checked
      );
      if (allChildrenChecked) {
        updatedCheckedItems.push(item);
      }
    }
    const childItem = updatedCheckedItems.some((x) => x.id === item?.parent_id);
    if (!childItem) {
      updatedCheckedItems.push(item);
    }
  }
  const filteredReturn = updatedCheckedItems.filter((item) => {
    return !updatedCheckedItems.find(
      (otherItem) => otherItem.id === item.parent_id
    );
  });
  return filteredReturn;
};

export const recursiveReturnOnlyParent = (
  items: { [key: string]: any },
  formattedData: { [key: string]: any }[],
  defaultReturn: { [key: string]: any }[],
  setDefaultReturn: any
) => {
  const parent = filterFormattedDataById(formattedData, items.parent_id);
  const allChildrenChecked = parent[0].children.every(
    (child: { [key: string]: any }) => child.checked
  );
  if (allChildrenChecked) {
    // Only return the parent and remove its children from defaultReturn
    parent[0].checked = true;
    const filteredDefaultReturn = defaultReturn.filter((item) => {
      // Remove children of the specific parent
      if (
        parent[0].children.find(
          (child: { [key: string]: any }) => child.id === item.id
        )
      ) {
        return false;
      }
    });
    setDefaultReturn([...filteredDefaultReturn, parent[0]]);
    // Check if the parent has a parent and its children are all checked
    const parentHasParent = parent[0].parent_id !== null;
    if (parentHasParent) {
      recursiveReturnOnlyParent(
        parent[0],
        formattedData,
        filteredDefaultReturn,
        setDefaultReturn
      );
    }
  } else {
    const checkedChildren = parent[0].children.filter(
      (child: { [key: string]: any }) => child.checked
    );
    const updatedDefaultReturn = [...defaultReturn, ...checkedChildren];
    setDefaultReturn(updatedDefaultReturn);
  }
};

export const removeChildrenIfParentChecked = (
  items: { [key: string]: any },
  defaultReturn: { [key: string]: any }[],
  setDefaultReturn: any
) => {
  const childIds = getChildIds(items, defaultReturn);
  const filteredDefaultArray = defaultReturn.filter(
    (item: { [key: string]: any }) => childIds !== item.id
  );
  setDefaultReturn([...filteredDefaultArray, items]);
};
