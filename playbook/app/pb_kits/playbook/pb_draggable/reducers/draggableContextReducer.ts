export type State = {
  items: any[];
  dragData: { id: string; initialGroup: string };
  isDragging: string;
  activeContainer: string;
};

type Action =
  | { type: "SET_ITEMS"; payload: any[] }
  | { type: "SET_DRAG_DATA"; payload: { id: string; initialGroup: string } }
  | { type: "SET_IS_DRAGGING"; payload: string }
  | { type: "SET_ACTIVE_CONTAINER"; payload: string }
  | { type: "REORDER_ITEMS"; payload: { id: string; targetId: string } }
  | { type: "CHANGE_CATEGORY"; payload: { id: string; container: string } }
  | { type: "ALL"; payload: Partial<State> };

const draggableContextReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.payload }
    case "SET_DRAG_DATA":
      return { ...state, dragData: action.payload }
    case "SET_IS_DRAGGING":
      return { ...state, isDragging: action.payload }
    case "SET_ACTIVE_CONTAINER":
      return { ...state, activeContainer: action.payload }
    case "REORDER_ITEMS":
      return { ...state, items: action.payload }
    case "CHANGE_CATEGORY":
      return { ...state, items: action.payload }
    case "ALL":
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default draggableContextReducer
