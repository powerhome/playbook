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
    onDragEnd?: () => void;
    onDrop?: (container: string) => void;
    onDragOver?: (e: Event, container: string) => void;
    dropZone?: DropZoneConfig | string; // Can accept string for backward compatibility
  }