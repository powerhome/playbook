import React, { createContext, useReducer, useContext, useEffect } from "react";
import draggableContextReducer, { State } from "../reducers/draggableContextReducer";

const initialState: State = {
  items: [],
  dragData: { id: "", initialGroup: "" },
  isDragging: "",
  activeContainer: "",
};

const DragContext = createContext<any>({});

export const DraggableContext = () => {
  return useContext(DragContext);
};

export const DraggableProvider = ({ children, initialItems, onReorder }: any) => {
  const [state, dispatch] = useReducer(draggableContextReducer, { ...initialState, items: initialItems });
  const { items, dragData, isDragging, activeContainer } = state;

  const setItems = (items: any[]) => {
    dispatch({ type: "SET_ITEMS", payload: items });
  };

  const setDragData = (data: { id: string; initialGroup: string }) => {
    dispatch({ type: "SET_DRAG_DATA", payload: data });
  }

  const setIsDragging = (id: string) => {
    dispatch({ type: "SET_IS_DRAGGING", payload: id });
  }

  const setActiveContainer = (container: string) => {
    dispatch({ type: "SET_ACTIVE_CONTAINER", payload: container });
  }

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  useEffect(() => {
    onReorder(items);
  }, [items]);

  const handleDragStart = (id: string, container: string) => {
    dispatch({ type: "ALL", payload: { isDragging: id, dragData: { id: id, initialGroup: container } } });
  };

  const handleDragEnter = (id: string, container: string) => {
    if (dragData?.id !== id) {
      const newItems = [...items];
      const draggedItem = newItems.find((item) => item.id === dragData.id);
      const draggedIndex = newItems.indexOf(draggedItem);
      const targetIndex = newItems.findIndex((item) => item.id === id);

      newItems.splice(draggedIndex, 1);
      newItems.splice(targetIndex, 0, draggedItem);

      dispatch({ type: "ALL", payload: { items: newItems, dragData: { id: dragData.id, initialGroup: container } } });
    }
  };

  const handleDragEnd = () => {
    dispatch({ type: "ALL", payload: { isDragging: "", activeContainer: "" } });
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
    dispatch({ type: "ALL", payload: { isDragging: "", activeContainer: "" } })
    const selected = dragData.id;
    changeCategory(selected, container);
  };

  const handleDragOver = (e: Event, container: string) => {
    e.preventDefault();
    dispatch({ type: "SET_ACTIVE_CONTAINER", payload: container });
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
