export const findItemById = (
  items: { [key: string]: any }[],
  id: string
): any => {
  for (const item of items) {
    if (item.id === id) {
      return item;
    }
    if (item.children) {
      const found = findItemById(item.children, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

export const checkIt = (
  foundItem: { [key: string]: any },
  selectedItems: any[],
  setSelectedItems: Function,
  expand: boolean
) => {
  if (!foundItem) {
    return;
  }

  foundItem.checked = true;
  foundItem.expanded = expand;
  selectedItems.push(foundItem);

  if (foundItem.children) {
    foundItem.children.map((x: any) => {
      checkIt(x, selectedItems, setSelectedItems, expand);
    });
  }

  setSelectedItems([...selectedItems]);
};

export const unCheckIt = (
  foundItem: { [key: string]: any },
  selectedItems: any,
  setSelectedItems: any,
  expand: boolean
) => {
  if (!foundItem) {
    return;
  }

  foundItem.checked = false;
  foundItem.expanded = false;
  const newSelectedItems = selectedItems.filter(
    (item: any) => item.id !== foundItem.id
  );
  if (foundItem.children) {
    foundItem.children.map((x: any) => {
      unCheckIt(x, selectedItems, setSelectedItems, expand);
    });
  }
  setSelectedItems([...newSelectedItems]);
};


export const getParentAndAncestorsIds = (itemId:string, items:{ [key: string]: string; }[], ancestors:string[] = []):any => {
  for (let i = 0; i < items.length; i++) {
    const item:any = items[i];
    if (item.id === itemId) {
      // item found in current level of items array
      return [...ancestors, item.id];
    }
    if (item.children && item.children.length > 0) {
      // recursively search through children
      const foundAncestors = getParentAndAncestorsIds(
        itemId,
        item.children,
        [...ancestors, item.id]
      );
      if (foundAncestors) {
        return foundAncestors;
      }
    }
  }
  // item not found in this level of items array or its children
  return null;
}