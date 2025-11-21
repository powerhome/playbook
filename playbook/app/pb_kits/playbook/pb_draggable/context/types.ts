export interface ItemType {
  id: string;
  container: string;
  [key: string]: any;
}

export interface InitialStateType {
  items: ItemType[];
  dragData: { id: string; initialGroup: string, originId?: string };
  isDragging: string;
  activeContainer: string;
}

export type ActionType =
  | { type: 'SET_ITEMS'; payload: ItemType[] }
  | { type: 'SET_DRAG_DATA'; payload: {
    originId: string; id: string; initialGroup: string 
} }
  | { type: 'SET_IS_DRAGGING'; payload: string }
  | { type: 'SET_ACTIVE_CONTAINER'; payload: string }
  | { type: 'CHANGE_CATEGORY'; payload: { itemId: string; container: string } }
  | { type: 'REORDER_ITEMS'; payload: { dragId: string; targetId: string } }
  | { type: 'REORDER_ITEMS_CROSS_CONTAINER'; payload: { dragId: string; targetId: string; newContainer: string } }
  | { type: 'MOVE_TO_CONTAINER_END'; payload: { dragId: string; newContainer: string } }
  | { type: 'RESET_DRAG_CONTAINER'; payload: { itemId: string; originalContainer: string } };

  export interface DropZoneConfig {
    type?: 'ghost' | 'outline' | 'shadow' | 'line';
    color?: 'primary' | 'neutral' | 'purple';
    direction?: 'horizontal' | 'vertical';
  }

  export interface DraggableProviderType {
    children: React.ReactNode;
    initialItems: ItemType[];
    onReorder: (items: ItemType[]) => void;
    onDragStart?: (id: string, container: string) => void;
    onDragEnter?: (id: string, container: string) => void;
    onDragEnd?: (draggedItemId: string, finalContainer: string, originalContainer: string, itemAbove: ItemType | null, itemBelow: ItemType | null) => void;
    onDrop?: (draggedItemId: string, droppedContainer: string, originalContainer: string, item: ItemType, itemAbove: ItemType | null, itemBelow: ItemType | null) => void;
    onDragOver?: (e: Event, container: string) => void;
    dropZone?: DropZoneConfig | string; // Can accept string for backward compatibility
    providerId?: string;
  }