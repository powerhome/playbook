import React, { createContext, useReducer, useContext, useEffect, useMemo, useRef } from "react";
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
      const draggedItem = newItems.find(item => item.id === dragId);
      const draggedIndex = newItems.indexOf(draggedItem);
      const targetIndex = newItems.findIndex(item => item.id === targetId);

      newItems.splice(draggedIndex, 1);
      newItems.splice(targetIndex, 0, draggedItem);

      return { ...state, items: newItems };
    }

    // Used only when enableCrossContainerPreview is true
    case "REORDER_ITEMS_CROSS_CONTAINER": {
      const { dragId, targetId, newContainer } = action.payload;
      const newItems = [...state.items];
      const draggedItem = newItems.find((item) => item && item.id === dragId);

      if (!draggedItem) return state;

      const draggedIndex = newItems.indexOf(draggedItem);
      const targetIndex = newItems.findIndex(
        (item) => item && item.id === targetId
      );

      if (draggedIndex === -1 || targetIndex === -1) return state;

      const updatedItem = { ...draggedItem, container: newContainer };
      newItems.splice(draggedIndex, 1);
      newItems.splice(targetIndex, 0, updatedItem);

      return { ...state, items: newItems };
    }

    // Used only when enableCrossContainerPreview is true
    case "MOVE_TO_CONTAINER_END": {
      const { dragId, newContainer } = action.payload;
      const newItems = [...state.items];
      const draggedItem = newItems.find((item) => item && item.id === dragId);

      if (!draggedItem) return state;

      const draggedIndex = newItems.indexOf(draggedItem);
      if (draggedIndex === -1) return state;

      const updatedItem = { ...draggedItem, container: newContainer };

      // Remove from current position
      newItems.splice(draggedIndex, 1);

      // Insert at end of target container
      const lastIndexInContainer = newItems
        .map((item) => item && item.container)
        .lastIndexOf(newContainer);

      if (lastIndexInContainer === -1) {
        newItems.push(updatedItem);
      } else {
        newItems.splice(lastIndexInContainer + 1, 0, updatedItem);
      }

      return { ...state, items: newItems };
    }

    // Reset item back to its original container (e.g., when drag ends without valid drop)
    case "RESET_DRAG_CONTAINER": {
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
  providerId = 'default', // fallback provided for backward compatibility
  // Opt-in flag for cross-container preview
  enableCrossContainerPreview = false,
}: DraggableProviderType) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  // Track drag state for global listener
  const dragStateRef = useRef<{
    isDragging: boolean;
    draggedItemId: string;
    originalContainer: string;
    currentContainer: string;
    dropOccurred: boolean;
  }>({
    isDragging: false,
    draggedItemId: '',
    originalContainer: '',
    currentContainer: '',
    dropOccurred: false,
  });

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

  // Monitor for failed drops by detecting mouse/pointer release during drag (this is needed for cross container preview)
  useEffect(() => {
    if (!enableCrossContainerPreview) return;

    // Allow drops anywhere on the document by preventing default dragover
    const handleGlobalDragOver = (e: DragEvent) => {
      if (dragStateRef.current.isDragging) {
        e.preventDefault();
      }
    };

    // Handle drops anywhere on the document (including non-container areas)
    const handleGlobalDrop = (e: DragEvent) => {
      if (!dragStateRef.current.isDragging) return;
      
      e.preventDefault();
      
      const currentContainer = dragStateRef.current.currentContainer;
      
      // If item is in a different container than original, treat it as a successful drop
      if (currentContainer && currentContainer !== dragStateRef.current.originalContainer) {
        
        // Mark as dropped so other handlers know
        dragStateRef.current.dropOccurred = true;
        
        // Trigger onDrop callback with the current container
        if (onDrop) {
          const draggedItem = state.items.find(item => item && item.id === dragStateRef.current.draggedItemId);
          const updatedItem = draggedItem ? { ...draggedItem, container: currentContainer } : null;
          const itemsInContainer = state.items.filter(item => item && item.container === currentContainer);
          const indexInContainer = itemsInContainer.findIndex(item => item && item.id === dragStateRef.current.draggedItemId);
          const itemAbove = indexInContainer > 0 ? itemsInContainer[indexInContainer - 1] : null;
          const itemBelow = indexInContainer < itemsInContainer.length - 1 ? itemsInContainer[indexInContainer + 1] : null;
          
          onDrop(
            dragStateRef.current.draggedItemId,
            currentContainer,
            dragStateRef.current.originalContainer,
            updatedItem,
            itemAbove,
            itemBelow
          );
        }
        
        dispatch({ type: 'SET_IS_DRAGGING', payload: "" });
        dispatch({ type: 'SET_ACTIVE_CONTAINER', payload: "" });
        dispatch({ type: 'SET_DRAG_DATA', payload: { id: "", initialGroup: "", originId: "" } });
      } else {
        // Reset to original container
        dispatch({
          type: 'RESET_DRAG_CONTAINER',
          payload: {
            itemId: dragStateRef.current.draggedItemId,
            originalContainer: dragStateRef.current.originalContainer,
          },
        });
        dispatch({ type: 'SET_IS_DRAGGING', payload: "" });
        dispatch({ type: 'SET_ACTIVE_CONTAINER', payload: "" });
        dispatch({ type: 'SET_DRAG_DATA', payload: { id: "", initialGroup: "", originId: "" } });
      }
    };

    const handleGlobalMouseUp = () => {
      // If we're dragging and mouse is released, wait a bit to see if drop occurs
      if (dragStateRef.current.isDragging) {
        setTimeout(() => {
          const currentContainer = dragStateRef.current.currentContainer;
          
          // If drop still hasn't occurred, check if item is in a different container
          if (dragStateRef.current.isDragging && !dragStateRef.current.dropOccurred) {
            // If item is in a different container than original, treat it as a successful drop
            if (currentContainer && currentContainer !== dragStateRef.current.originalContainer) {
              // Trigger onDrop callback with the current container
              if (onDrop) {
                const draggedItem = state.items.find(item => item && item.id === dragStateRef.current.draggedItemId);
                const updatedItem = draggedItem ? { ...draggedItem, container: currentContainer } : null;
                const itemsInContainer = state.items.filter(item => item && item.container === currentContainer);
                const indexInContainer = itemsInContainer.findIndex(item => item && item.id === dragStateRef.current.draggedItemId);
                const itemAbove = indexInContainer > 0 ? itemsInContainer[indexInContainer - 1] : null;
                const itemBelow = indexInContainer < itemsInContainer.length - 1 ? itemsInContainer[indexInContainer + 1] : null;
                
                onDrop(
                  dragStateRef.current.draggedItemId,
                  currentContainer,
                  dragStateRef.current.originalContainer,
                  updatedItem,
                  itemAbove,
                  itemBelow
                );
              }
            } else {
              dispatch({
                type: 'RESET_DRAG_CONTAINER',
                payload: {
                  itemId: dragStateRef.current.draggedItemId,
                  originalContainer: dragStateRef.current.originalContainer,
                },
              });
            }
            dispatch({ type: 'SET_IS_DRAGGING', payload: "" });
            dispatch({ type: 'SET_ACTIVE_CONTAINER', payload: "" });
            dispatch({ type: 'SET_DRAG_DATA', payload: { id: "", initialGroup: "", originId: "" } });
            
            // Clear drag state
            dragStateRef.current = {
              isDragging: false,
              draggedItemId: '',
              originalContainer: '',
              currentContainer: '',
              dropOccurred: false,
            };
          }
        }, 50); // Small delay to let drop event fire if it's going to
      }
    };

    document.addEventListener('dragover', handleGlobalDragOver);
    document.addEventListener('drop', handleGlobalDrop);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('pointerup', handleGlobalMouseUp);
    
    return () => {
      document.removeEventListener('dragover', handleGlobalDragOver);
      document.removeEventListener('drop', handleGlobalDrop);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('pointerup', handleGlobalMouseUp);
    };
  }, [enableCrossContainerPreview]);

  // Detect when dragging stops (isDragging goes from truthy to empty)
  const prevIsDraggingRef = useRef(state.isDragging);
  
  useEffect(() => {
    if (!enableCrossContainerPreview) return;

    const wasDragging = prevIsDraggingRef.current;
    const isNowDragging = state.isDragging;

    // Drag just ended (was dragging, now not)
    if (wasDragging && !isNowDragging) {
      
      // If drop didn't occur, reset to original container
      if (!dragStateRef.current.dropOccurred && dragStateRef.current.draggedItemId) {
        dispatch({
          type: 'RESET_DRAG_CONTAINER',
          payload: {
            itemId: dragStateRef.current.draggedItemId,
            originalContainer: dragStateRef.current.originalContainer,
          },
        });
      }
      
      // Clear drag state
      dragStateRef.current = {
        isDragging: false,
        draggedItemId: '',
        originalContainer: '',
        currentContainer: '',
        dropOccurred: false,
      };
    }
    
    prevIsDraggingRef.current = isNowDragging;
  }, [state.isDragging, enableCrossContainerPreview]);

  const handleDragStart = (id: string, container: string) => {
    // Track drag in ref for global listener
    if (enableCrossContainerPreview) {
      dragStateRef.current = {
        isDragging: true,
        draggedItemId: id,
        originalContainer: container,
        currentContainer: container,
        dropOccurred: false,
      };
    }
    
    dispatch({ type: 'SET_DRAG_DATA', payload: { id: id, initialGroup: container, originId: providerId } });
    dispatch({ type: 'SET_IS_DRAGGING', payload: id });
    if (onDragStart) onDragStart(id, container);
  };

  const handleDragEnter = (id: string, container: string) => {
    if (state.dragData.originId !== providerId) return; // Ignore drag events from other providers

    if (state.dragData.id !== id) {
      if (enableCrossContainerPreview) {
        // Used only when enableCrossContainerPreview is true
        const draggedItem = state.items.find(
          (item) => item && item.id === state.dragData.id
        );
        const currentContainer =
          draggedItem && draggedItem.container
            ? draggedItem.container
            : state.dragData.initialGroup;

        const isCrossContainer =
          currentContainer !== container &&
          (currentContainer !== undefined || container !== undefined);

        if (isCrossContainer) {
          dispatch({
            type: "REORDER_ITEMS_CROSS_CONTAINER",
            payload: {
              dragId: state.dragData.id,
              targetId: id,
              newContainer: container,
            },
          });
          // Update current container in ref
          if (enableCrossContainerPreview) {
            dragStateRef.current.currentContainer = container;
          }
        } else {
          // Same container: keep original behavior
          dispatch({
            type: "REORDER_ITEMS",
            payload: { dragId: state.dragData.id, targetId: id },
          });
        }
      } else {
        // Original behavior (no preview across containers)
        dispatch({type: "REORDER_ITEMS", payload: { dragId: state.dragData.id, targetId: id }});
      }

      // When enableCrossContainerPreview is true, preserve the original initialGroup
      // Otherwise, update it to track the current container
      const newInitialGroup = enableCrossContainerPreview ? state.dragData.initialGroup : container;
      dispatch({type: "SET_DRAG_DATA",payload: {id: state.dragData.id, initialGroup: newInitialGroup, originId: providerId}});
    }
    if (onDragEnter) onDragEnter(id, container);
  };

  const handleDragEnd = () => {
    const draggedItemId = state.dragData.id;
    const originalContainer = state.dragData.initialGroup;
    
    // If enableCrossContainerPreview is true and no drop occurred, reset item to original container
    if (enableCrossContainerPreview && !dragStateRef.current.dropOccurred && draggedItemId && originalContainer) {
      dispatch({ type: 'RESET_DRAG_CONTAINER', payload: { itemId: draggedItemId, originalContainer } });
    }
    
    dispatch({ type: 'SET_IS_DRAGGING', payload: "" });
    dispatch({ type: 'SET_ACTIVE_CONTAINER', payload: "" });
    dispatch({ type: 'SET_DRAG_DATA', payload: { id: "", initialGroup: "", originId: "" } });
    
    if (onDragEnd) {
      if (!enableCrossContainerPreview) {
        onDragEnd();
      } else {
        const draggedItem = state.items.find(item => item && item.id === draggedItemId);
        const finalContainer = draggedItem ? draggedItem.container : originalContainer;
        
        const itemsInContainer = state.items.filter(item => item && item.container === finalContainer);
        const indexInContainer = itemsInContainer.findIndex(item => item && item.id === draggedItemId);
        const itemAbove = indexInContainer > 0 ? itemsInContainer[indexInContainer - 1] : null;
        const itemBelow = indexInContainer < itemsInContainer.length - 1 ? itemsInContainer[indexInContainer + 1] : null;
        
        onDragEnd(
          draggedItemId,
          finalContainer,
          originalContainer,
          itemAbove,
          itemBelow
        );
      }
    }
  };

  const changeCategory = (itemId: string, container: string) => {
    dispatch({ type: 'CHANGE_CATEGORY', payload: { itemId, container } });
  };

  const handleDrop = (container: string) => {
    if (state.dragData.originId !== providerId) return; // Ignore drop events from other providers

    const draggedItemId = state.dragData.id;
    const originalContainer = state.dragData.initialGroup;
    
    // Mark drop as successful in ref for global listener
    if (enableCrossContainerPreview) {
      dragStateRef.current.dropOccurred = true;
    }

    dispatch({ type: 'SET_IS_DRAGGING', payload: "" });
    dispatch({ type: 'SET_ACTIVE_CONTAINER', payload: "" });
    dispatch({ type: 'SET_DRAG_DATA', payload: { id: "", initialGroup: "", originId: "" } });
    changeCategory(state.dragData.id, container);
    if (onDrop) {
      if (!enableCrossContainerPreview) {
        onDrop(container);
      } else {
        const draggedItem = state.items.find(item => item && item.id === draggedItemId);
        const updatedItem = draggedItem ? { ...draggedItem, container } : null;
        
        const itemsInContainer = state.items.filter(item => item && item.container === container);
        const indexInContainer = itemsInContainer.findIndex(item => item && item.id === draggedItemId);
        const itemAbove = indexInContainer > 0 ? itemsInContainer[indexInContainer - 1] : null;
        const itemBelow = indexInContainer < itemsInContainer.length - 1 ? itemsInContainer[indexInContainer + 1] : null;
        
        onDrop(
          draggedItemId,
          container,
          originalContainer,
          updatedItem,
          itemAbove,
          itemBelow
        );
      }
    }
  };

  const handleDragOver = (e: Event, container: string) => {
     if (state.dragData.originId !== providerId) return; // Ignore drag over events from other providers

    e.preventDefault();
    dispatch({ type: 'SET_ACTIVE_CONTAINER', payload: container });

    if (enableCrossContainerPreview && state.dragData.id) {
      // Only when enableCrossContainerPreview is true: when hovering over a different container, move item to end
      const draggedItem = state.items.find(
        (item) => item && item.id === state.dragData.id
      );
      if (draggedItem && draggedItem.container !== container) {
        dispatch({
          type: "MOVE_TO_CONTAINER_END",
          payload: { dragId: state.dragData.id, newContainer: container },
        });
        // Update current container in ref
        dragStateRef.current.currentContainer = container;
      }
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