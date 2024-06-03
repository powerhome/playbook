import React, { createContext, useState, useContext, useEffect } from "react";

const DragContext = createContext<any>({});

export const DraggableContext = () => {
  return useContext(DragContext);
};

export const DraggableProvider = ({ children, initialItems, onChange }: any) => {
  const [items, setItems] = useState([]);
  const [dragData, setDragData] = useState<{ [key: string]: any }>({});
  const [isDragging, setIsDragging] = useState("");
  const [activeContainer, setActiveContainer] = useState("");

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  useEffect(() => {
    onChange(items);
  }, [items]);

  const handleDragStart = (id: string, container: string) => {
    setDragData({ id: id, initialGroup: container });
    setIsDragging(id);
  };

  const handleDragEnter = (id: string, container: string) => {
    if (dragData?.id !== id) {
      const newItems = [...items];
      const draggedItem = newItems.find((item) => item.id === dragData.id);
      const draggedIndex = newItems.indexOf(draggedItem);
      const targetIndex = newItems.findIndex((item) => item.id === id);

      newItems.splice(draggedIndex, 1);
      newItems.splice(targetIndex, 0, draggedItem);

      setItems(newItems);
      setDragData({ id: dragData.id, initialGroup: container });
    }
  };

  const handleDragEnd = () => {
    setIsDragging("");
    setActiveContainer("");
  };

  const changeCategory = (itemId: string, container: string) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, container: container };
      }
      return item;
    });

    setItems(updatedItems);
  };

  const handleDrop = (container: string) => {
    setIsDragging("");
    setActiveContainer("");
    const selected = dragData.id;
    changeCategory(selected, container);
  };

  const handleDragOver = (e: Event, container: string) => {
    e.preventDefault();
    setActiveContainer(container);
  };

  

  const contextValue = {
    items,
    setItems,
    dragData,
    setDragData,
    isDragging,
    setIsDragging,
    activeContainer,
    setActiveContainer,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
    handleDrop,
    handleDragOver,
  };

  return (
    <DragContext.Provider value={contextValue}>{children}</DragContext.Provider>
  );
};
