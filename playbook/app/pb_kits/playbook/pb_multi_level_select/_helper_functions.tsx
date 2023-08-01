//function to retrieve all ancestors of unchecked item and set checked to false
export const getAncestorsOfUnchecked = (
  data: { [key: string]: any }[],
  item: { [key: string]: any }
) => {
  if (item.parent_id) {
    const ancestor = filterFormattedDataById(data, item.parent_id);
    ancestor[0].checked = false;
    ancestor[0].parent_id && getAncestorsOfUnchecked(data, ancestor[0]);
  }
  return data;
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
      if (item.id.toLowerCase() === term.toLowerCase()) {
        matched.push(item);
        return;
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

export const getDefaultCheckedItems = (treeData: { [key: string]: any }[]) => {
  const checkedDefault: { [key: string]: any }[] = [];

  const traverseTree = (items: { [key: string]: any }[]) => {
    if (!Array.isArray(items)) {
      return;
    }
    items.forEach((item: { [key: string]: any }) => {
      if (item.checked) {
        if (item.children && item.children.length > 0) {
          const uncheckedChildren = item.children.filter(
            (child: { [key: string]: any }) => !child.checked
          );
          if (uncheckedChildren.length === 0) {
            checkedDefault.push(item);
            return;
          }
        } else {
          const parent = items.find(
            (parentItem: { [key: string]: any }) =>
              parentItem.id === item.parentId
          );
          if (!parent || !parent.checked) {
            checkedDefault.push(item);
          }
        }
      }

      if (item.children && item.children.length > 0) {
        traverseTree(item.children);
      }
    });
  };

  traverseTree(treeData);

  return checkedDefault;
};

export const recursiveCheckParent = (
  item: { [key: string]: any },
  data: any
) => {
  if (item.parent_id !== null) {
    const parent = filterFormattedDataById(data, item.parent_id);
    const allChildrenChecked = parent[0].children.every(
      (child: { [key: string]: any }) => child.checked
    );
    if (allChildrenChecked) {
      parent[0].checked = true;
      const parentHasParent = parent[0].parent_id !== null;
      if (parentHasParent) {
        recursiveCheckParent(parent[0], data);
      }
    }
  }
  return data;
};

export const getExpandedItems = (treeData: { [key: string]: string }[], selectedIds: string[]) => {
  let expandedItems: any[] = [];

  const traverse = (items: string | any[], ancestors: any[] = []) => {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemAncestors = [...ancestors, item];

      if (item.expanded) {
        expandedItems.push(item.id);
      }
      if (selectedIds && selectedIds.length && selectedIds.includes(item.id)) {
        expandedItems.push(...itemAncestors.map((ancestor) => ancestor.id));
      }
      if (Array.isArray(item.children)) {
        const hasCheckedChildren = item.children.some(
          (child: { [key: string]: string }) => child.checked
        );
        if (hasCheckedChildren) {
          expandedItems.push(...itemAncestors.map((ancestor) => ancestor.id));
        }
        traverse(item.children, itemAncestors);
      }
    }
  };

  traverse(treeData);
  return expandedItems;
};
