export interface ItemType {
    id: string;
    container: string;
    [key: string]: any;
  }
  
  export interface InitialStateType {
    items: ItemType[];
    dragData: { id: string; initialGroup: string };
    isDragging: string;
    activeContainer: string;
  }
  
  export type ActionType =
    | { type: 'SET_ITEMS'; payload: ItemType[] }
    | { type: 'SET_DRAG_DATA'; payload: { id: string; initialGroup: string } }
    | { type: 'SET_IS_DRAGGING'; payload: string }
    | { type: 'SET_ACTIVE_CONTAINER'; payload: string }
    | { type: 'CHANGE_CATEGORY'; payload: { itemId: string; container: string } }
    | { type: 'REORDER_ITEMS'; payload: { dragId: string; targetId: string } };

    export interface DraggableProviderType {
      children: React.ReactNode;
      initialItems: ItemType[];
      onReorder: (items: ItemType[]) => void;
    }