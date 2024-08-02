import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useReducer, useContext, useEffect, useMemo } from "react";
const initialState = {
    items: [],
    dragData: { id: "", initialGroup: "" },
    isDragging: "",
    activeContainer: ""
};
const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_ITEMS':
            return Object.assign(Object.assign({}, state), { items: action.payload });
        case 'SET_DRAG_DATA':
            return Object.assign(Object.assign({}, state), { dragData: action.payload });
        case 'SET_IS_DRAGGING':
            return Object.assign(Object.assign({}, state), { isDragging: action.payload });
        case 'SET_ACTIVE_CONTAINER':
            return Object.assign(Object.assign({}, state), { activeContainer: action.payload });
        case 'CHANGE_CATEGORY':
            return Object.assign(Object.assign({}, state), { items: state.items.map(item => item.id === action.payload.itemId
                    ? Object.assign(Object.assign({}, item), { container: action.payload.container }) : item) });
        case 'REORDER_ITEMS': {
            const { dragId, targetId } = action.payload;
            const newItems = [...state.items];
            const draggedItem = newItems.find(item => item.id === dragId);
            const draggedIndex = newItems.indexOf(draggedItem);
            const targetIndex = newItems.findIndex(item => item.id === targetId);
            newItems.splice(draggedIndex, 1);
            newItems.splice(targetIndex, 0, draggedItem);
            return Object.assign(Object.assign({}, state), { items: newItems });
        }
        default:
            return state;
    }
};
// Context and Provider
const DragContext = createContext({});
export const DraggableContext = () => {
    return useContext(DragContext);
};
export const DraggableProvider = ({ children, initialItems, onReorder, onDragStart, onDragEnter, onDragEnd, onDrop, onDragOver }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        dispatch({ type: 'SET_ITEMS', payload: initialItems });
    }, [initialItems]);
    useEffect(() => {
        onReorder(state.items);
    }, [state.items]);
    const handleDragStart = (id, container) => {
        dispatch({ type: 'SET_DRAG_DATA', payload: { id: id, initialGroup: container } });
        dispatch({ type: 'SET_IS_DRAGGING', payload: id });
        if (onDragStart)
            onDragStart(id, container);
    };
    const handleDragEnter = (id, container) => {
        if (state.dragData.id !== id) {
            dispatch({ type: 'REORDER_ITEMS', payload: { dragId: state.dragData.id, targetId: id } });
            dispatch({ type: 'SET_DRAG_DATA', payload: { id: state.dragData.id, initialGroup: container } });
        }
        if (onDragEnter)
            onDragEnter(id, container);
    };
    const handleDragEnd = () => {
        dispatch({ type: 'SET_IS_DRAGGING', payload: "" });
        dispatch({ type: 'SET_ACTIVE_CONTAINER', payload: "" });
        if (onDragEnd)
            onDragEnd();
    };
    const changeCategory = (itemId, container) => {
        dispatch({ type: 'CHANGE_CATEGORY', payload: { itemId, container } });
    };
    const handleDrop = (container) => {
        dispatch({ type: 'SET_IS_DRAGGING', payload: "" });
        dispatch({ type: 'SET_ACTIVE_CONTAINER', payload: "" });
        changeCategory(state.dragData.id, container);
        if (onDrop)
            onDrop(container);
    };
    const handleDragOver = (e, container) => {
        e.preventDefault();
        dispatch({ type: 'SET_ACTIVE_CONTAINER', payload: container });
        if (onDragOver)
            onDragOver(e, container);
    };
    const contextValue = useMemo(() => ({
        items: state.items,
        dragData: state.dragData,
        isDragging: state.isDragging,
        activeContainer: state.activeContainer,
        handleDragStart,
        handleDragEnter,
        handleDragEnd,
        handleDrop,
        handleDragOver
    }), [state]);
    return (_jsx(DragContext.Provider, { value: contextValue, children: children }));
};
//# sourceMappingURL=index.js.map