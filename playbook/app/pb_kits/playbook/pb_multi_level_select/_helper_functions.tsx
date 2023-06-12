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
export const getAncestorsOfChecked = (
  formattedData: { [key: string]: any }[],
  item: { [key: string]: any }
) => {
  if (item.parent_id) {
    const ancestors = filterFormattedDataById(formattedData, item.parent_id);
    ancestors[0].checked = false;

    if (ancestors[0].parent_id) {
      getAncestorsOfChecked(formattedData, ancestors[0]);
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
      if (item.id.toLowerCase().includes(term.toLowerCase())) {
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

export const getChildIds = (item: any, defaultArray: any) => {
  let childIds: any[] = [];
  item.children.forEach((child: any) => {
    childIds.push(child.id);
    if (child.children && child.children.length > 0) {
      const childChildIds = getChildIds(child, defaultArray);
      childIds.push(...childChildIds);
    }
  });
  return childIds;
};
