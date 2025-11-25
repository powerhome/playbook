import React, { createContext, useReducer, useContext, useEffect, useMemo } from "react";
import { InitialStateType, ActionType, DraggableProviderType } from "./types";

const initialState: InitialStateType = {
  items: [],
  dragData: { id: "", initialGroup: "", originId: "" },
  isDragging: "",
  activeContainer: ""
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
      const draggedItem = newItems.find(item => item && item.id === dragId);
      const draggedIndex = newItems.indexOf(draggedItem);
      const targetIndex = newItems.findIndex(item => item && item.id === targetId);

      newItems.splice(draggedIndex, 1);
      newItems.splice(targetIndex, 0, draggedItem);

      return { ...state, items: newItems };
    }
    case 'REORDER_ITEMS_CROSS_CONTAINER': {
      const { dragId, targetId, newContainer } = action.payload;
      const newItems = [...state.items];
      const draggedItem = newItems.find(item => item && item.id === dragId);
      const draggedIndex = newItems.indexOf(draggedItem);
      const targetIndex = newItems.findIndex(item => item && item.id === targetId);

      // Update container temporarily so dropzone preview works correctly
      const updatedItem = { ...draggedItem, container: newContainer };
      newItems.splice(draggedIndex, 1);
      newItems.splice(targetIndex, 0, updatedItem);

      return { ...state, items: newItems };
    }
    case 'MOVE_TO_CONTAINER_END': {
      const { dragId, newContainer } = action.payload;
      const newItems = [...state.items];
      const draggedItem = newItems.find(item => item && item.id === dragId);
      const draggedIndex = newItems.indexOf(draggedItem);

      // Update container temporarily so dropzone preview works correctly
      const updatedItem = { ...draggedItem, container: newContainer };

      // Remove from current position
      newItems.splice(draggedIndex, 1);

      // Find the last item in the target container and insert after it
      const lastIndexInContainer = newItems.map(item => item.container).lastIndexOf(newContainer);
      if (lastIndexInContainer === -1) {
        // Container is empty, add to end
        newItems.push(updatedItem);
      } else {
        // Insert after last item in container
        newItems.splice(lastIndexInContainer + 1, 0, updatedItem);
      }

      return { ...state, items: newItems };
    }
    case 'RESET_DRAG_CONTAINER': {
      const { itemId, originalContainer } = action.payload;
      return {
        ...state,
        items: state.items.map(item =>
          item.id === itemId
            ? { ...item, container: originalContainer }
            : item
        )
      };
    }
    default:
      return state;
  }
};

// Context and Provider
const DragContext = createContext<any>({});

export const DraggableContext = () => {
  return useContext(DragContext);
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
  dropZone = { type: 'ghost', color: 'neutral', direction: 'vertical' },
  providerId = 'default', // fallback provided for backward compatibility, so this does not become a required prop
}: DraggableProviderType) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
  }, [initialItems]);

  useEffect(() => {
    onReorder(state.items);
  }, [state.items]);

  const handleDragStart = (id: string, container: string) => {
    dispatch({ type: 'SET_DRAG_DATA', payload: { id: id, initialGroup: container, originId: providerId } });
    dispatch({ type: 'SET_IS_DRAGGING', payload: id });
    if (onDragStart) onDragStart(id, container);
  };

  const handleDragEnter = (id: string, container: string) => {
    if (state.dragData.originId !== providerId) return; // Ignore drag events from other providers

    if (state.dragData.id !== id) {
      // Find the current container of the dragged item
      const draggedItem = state.items.find(item => item && item.id === state.dragData.id);
      const currentContainer = draggedItem ? draggedItem.container : state.dragData.initialGroup;
      
      // Check if cross-container - treat undefined as same container
      const isCrossContainer = currentContainer !== container && (currentContainer !== undefined || container !== undefined);
      
      if (isCrossContainer) {
        // Use cross-container reorder to update container temporarily for dropzone preview
        dispatch({ type: 'REORDER_ITEMS_CROSS_CONTAINER', payload: { dragId: state.dragData.id, targetId: id, newContainer: container } });
      } else {
        // Same container: use normal reorder no need to be fancy nancy
        dispatch({ type: 'REORDER_ITEMS', payload: { dragId: state.dragData.id, targetId: id } });
      }
      dispatch({ type: 'SET_DRAG_DATA', payload: { id: state.dragData.id, initialGroup: container, originId: providerId } });
    }
    if (onDragEnter) onDragEnter(id, container);
  };

  const handleDragEnd = () => {
    const draggedItemId = state.dragData.id;
    const originalContainer = state.dragData.initialGroup;
    
    if (!draggedItemId) {
      dispatch({ type: 'SET_IS_DRAGGING', payload: "" });
      dispatch({ type: 'SET_ACTIVE_CONTAINER', payload: "" });
      dispatch({ type: 'SET_DRAG_DATA', payload: { id: "", initialGroup: "", originId: "" } });
      return;
    }
    
    const draggedItem = state.items.find(item => item && item.id === draggedItemId);
    const finalContainer = draggedItem ? draggedItem.container : originalContainer;
    
    // Find items above and below in the same container
    const itemsInContainer = state.items.filter(item => item && item.container === finalContainer);
    const indexInContainer = itemsInContainer.findIndex(item => item && item.id === draggedItemId);
    const itemAbove = indexInContainer > 0 ? itemsInContainer[indexInContainer - 1] : null;
    const itemBelow = indexInContainer < itemsInContainer.length - 1 ? itemsInContainer[indexInContainer + 1] : null;
    
    dispatch({ type: 'SET_IS_DRAGGING', payload: "" });
    dispatch({ type: 'SET_ACTIVE_CONTAINER', payload: "" });
    dispatch({ type: 'SET_DRAG_DATA', payload: { id: "", initialGroup: "", originId: "" } });
    
    // Pass enhanced info to onDragEnd callback to give dev more context
    if (onDragEnd) onDragEnd(draggedItemId, finalContainer, originalContainer, itemAbove, itemBelow);
  };

  const changeCategory = (itemId: string, container: string) => {
    dispatch({ type: 'CHANGE_CATEGORY', payload: { itemId, container } });
  };

  const handleDrop = (container: string) => {
    if (state.dragData.originId !== providerId) return; // Ignore drop events from other providers

    const draggedItemId = state.dragData.id;
    const originalContainer = state.dragData.initialGroup;
    
    if (!draggedItemId) return;
    
    const draggedItem = state.items.find(item => item && item.id === draggedItemId);
    
    if (!draggedItem) {
      dispatch({ type: 'SET_IS_DRAGGING', payload: "" });
      dispatch({ type: 'SET_ACTIVE_CONTAINER', payload: "" });
      dispatch({ type: 'SET_DRAG_DATA', payload: { id: "", initialGroup: "", originId: "" } });
      return;
    }
    
    // Find items above and below in the same container
    const itemsInContainer = state.items.filter(item => item && item.container === container);
    const indexInContainer = itemsInContainer.findIndex(item => item && item.id === draggedItemId);
    const itemAbove = indexInContainer > 0 ? itemsInContainer[indexInContainer - 1] : null;
    const itemBelow = indexInContainer < itemsInContainer.length - 1 ? itemsInContainer[indexInContainer + 1] : null;
    
    dispatch({ type: 'SET_IS_DRAGGING', payload: "" });
    dispatch({ type: 'SET_ACTIVE_CONTAINER', payload: "" });
    // changeCategory will ensure the container is set correctly on drop for cross container and same container drops
    changeCategory(draggedItemId, container);
    
    if (onDrop && draggedItem) {
      const updatedItem = { ...draggedItem, container };
      onDrop(draggedItemId, container, originalContainer, updatedItem, itemAbove, itemBelow);
    }
  };

  const handleDragOver = (e: Event, container: string) => {
    if (state.dragData.originId !== providerId) return;

    e.preventDefault();
    dispatch({ type: 'SET_ACTIVE_CONTAINER', payload: container });
    
    // Guard against missing drag ID
    if (!state.dragData.id) return;
    
    // Find the dragged item
    const draggedItem = state.items.find(item => item && item.id === state.dragData.id);
    
    // Only move to container end if item exists and is in a different container
    if (draggedItem && draggedItem.container !== container) {
      dispatch({ type: 'MOVE_TO_CONTAINER_END', payload: { dragId: state.dragData.id, newContainer: container } });
    }
    
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
  }), [state, dropZoneType, dropZoneColor, dropZoneDirection]);

  return (
    <DragContext.Provider value={contextValue}>{children}</DragContext.Provider>
  );
};
