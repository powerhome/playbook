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
  setSelectedItems: Function
) => {
  if (!foundItem) {
    return;
  }

  foundItem.checked = true;
  foundItem.expanded = true;
  selectedItems.push(foundItem);

  if (foundItem.children) {
    foundItem.children.map((x: any) => {
      checkIt(x, selectedItems, setSelectedItems);
    });
  }

  setSelectedItems([...selectedItems]);
};

export const unCheckIt = (
  foundItem: { [key: string]: any },
  selectedItems: any,
  setSelectedItems: any
) => {
  if (!foundItem) {
    return;
  }

  foundItem.checked = false;
  const newSelectedItems = selectedItems.filter(
    (item: any) => item.id !== foundItem.id
  );
  if (foundItem.children) {
    foundItem.children.map((x: any) => {
      unCheckIt(x, selectedItems, setSelectedItems);
    });
  }
  setSelectedItems([...newSelectedItems]);
};
