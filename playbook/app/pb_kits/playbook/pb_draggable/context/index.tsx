import React, { createContext, useReducer, useContext, useEffect, useMemo, useRef, useState } from "react";
import { InitialStateType, ActionType, DraggableProviderType } from "./types";

const initialState: InitialStateType = {
  items: [],
  dragData: { id: "", initialGroup: "" },
  isDragging: "",
  activeContainer: "",
};

const reducer = (state: InitialStateType, action: ActionType) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'SET_DRAG_DATA':
      return { ...state, dragData: action.payload };
    case 'SET_IS_DRAGGING':
      return { ...state, isDragging: action.payload };
    case 'SET_ACTIVE_CONTAINER':
      return { ...state, activeContainer: action.payload };
    case 'CHANGE_CATEGORY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.itemId
            ? { ...item, container: action.payload.container }
            : item
        )
      };
    case 'REORDER_ITEMS': {
      const { dragId, targetId } = action.payload;
      const newItems = [...state.items];
      const draggedItem = newItems.find(item => item.id === dragId);
      const targetItem = newItems.find(item => item.id === targetId);
    
      if (!draggedItem || !targetItem || draggedItem.container !== targetItem.container) {
        return state;
      }

      if (dragId === targetId) {
        return state;
      }

      const draggedIndex = newItems.findIndex(item => item.id === dragId);
      const targetIndex = newItems.findIndex(item => item.id === targetId);

      if (draggedIndex === -1 || targetIndex === -1) {
        return state;
      }

      newItems.splice(draggedIndex, 1);
      newItems.splice(targetIndex, 0, draggedItem);

      return { ...state, items: newItems };
    }
    default:
      return state;
  }
};

// Context and Provider
const DragContext = createContext<any>({});

export const DraggableContext = () => {
  const context = useContext(DragContext);
  if (context === undefined) {
    throw new Error('DraggableContext must be used within a DraggableProvider');
  }
  return context;
};

export const DraggableProvider = ({
  children,
  initialItems,
  onReorder,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onDrop,
  onDragOver,
  dropZone = { type: 'ghost', color: 'neutral', direction: 'vertical' }
}: DraggableProviderType) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  // Store initial items in a ref to use if needed (for consistency when needed in future updates)
  const initialItemsRef = useRef(initialItems);
  const [isDragging, setIsDragging] = useState(false);
  
  // Parse dropZone prop - handle both string format (backward compatibility) and object format
  let dropZoneType = 'ghost';
  let dropZoneColor = 'neutral';
  let dropZoneDirection = 'vertical';

  if (typeof dropZone === 'string') {
    // Legacy format - just the type is provided as a string
    dropZoneType = dropZone;
  } else {
    // New object format
    dropZoneType = dropZone.type || 'ghost';
    // Line default is set to primary. Other types default to neutral.
    dropZoneColor = dropZone.type === 'line' ? (dropZone.color || 'primary') : (dropZone.color || 'neutral');

    // Only use direction if the type is 'line'
    if (dropZoneType === 'line') {
      dropZoneDirection = dropZone.direction || 'vertical';
    }
  }

  useEffect(() => {
    dispatch({ type: 'SET_ITEMS', payload: initialItems });
    initialItemsRef.current = initialItems;
  }, [initialItems]);

  useEffect(() => {
    if (onReorder) {
      onReorder(state.items);
    }
  }, [state.items, onReorder]);

  const handleDragStart = (id: string, container: string) => {
    setIsDragging(true);
    dispatch({ type: 'SET_DRAG_DATA', payload: { id, initialGroup: container } });
    dispatch({ type: 'SET_IS_DRAGGING', payload: id });
    dispatch({ type: 'SET_ACTIVE_CONTAINER', payload: container });
    if (onDragStart) onDragStart(id, container);
  };

  const handleDragEnter = (id: string, container: string) => {
    if (!isDragging || container !== state.activeContainer) return;

    if (state.dragData.id === id) return;

    const draggedItem = state.items.find(item => item.id === state.dragData.id);
    const targetItem = state.items.find(item => item.id === id);

    if (!draggedItem || !targetItem || draggedItem.container !== targetItem.container) {
      return;
    }

    dispatch({ type: 'REORDER_ITEMS', payload: { dragId: state.dragData.id, targetId: id } });
    
    if (onDragEnter) onDragEnter(id, container);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    dispatch({ type: 'SET_IS_DRAGGING', payload: "" });
    dispatch({ type: 'SET_ACTIVE_CONTAINER', payload: "" });
    if (onDragEnd) onDragEnd();
  };

  const handleDrop = (container: string) => {
    const draggedItem = state.items.find(item => item.id === state.dragData.id);
    
    if (draggedItem && draggedItem.container !== container) {
      dispatch({ type: 'CHANGE_CATEGORY', payload: { itemId: state.dragData.id, container } });
    }

    dispatch({ type: 'SET_IS_DRAGGING', payload: "" });
    dispatch({ type: 'SET_ACTIVE_CONTAINER', payload: "" });

    setIsDragging(false);
    if (onDrop) onDrop(container);
  };

  const handleDragOver = (e: Event, container: string) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'SET_ACTIVE_CONTAINER', payload: container });
    if (onDragOver) onDragOver(e, container);
  };

  // Include direction in contextValue only if type is 'line'
  const contextValue = useMemo(() => ({
    items: state.items,
    dragData: state.dragData,
    isDragging: state.isDragging,
    activeContainer: state.activeContainer,
    dropZone: dropZoneType,
    dropZoneColor,
    // Only include direction when type is 'line'
    ...(dropZoneType === 'line' ? { direction: dropZoneDirection } : {}),
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
    handleDrop,
    handleDragOver
  }), [state, dropZoneType, dropZoneColor, dropZoneDirection,  handleDragStart, handleDragEnter, handleDragEnd, handleDrop, handleDragOver]);

  return (
    <DragContext.Provider value={contextValue}>{children}</DragContext.Provider>
  );
};
