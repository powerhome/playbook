export const DRAG_HANDLE_SELECTOR = '.pb_draggable_handle, .card_draggable_handle';

const DRAG_THRESHOLD_PX = 5;

export const isTouchDragDevice = (): boolean => {
  if (typeof window === 'undefined') return false;

  // Only treat true touch-primary devices as touch-drag targets.
  // `ontouchstart` alone is true on many desktops (e.g. macOS trackpads) and
  // must not disable HTML5 mouse dragging.
  const hasCoarsePointer =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  return hasCoarsePointer;
};

export const getDragIdFromElement = (element: Element | null): string | null => {
  const item = element?.closest('.pb_draggable_item');
  if (!item) return null;

  return item.getAttribute('data-pb-drag-id');
};

export const getContainerFromElement = (element: Element | null): string | undefined => {
  const container = element?.closest('.pb_draggable_container');
  if (!container) return undefined;

  return container.getAttribute('data-pb-drag-container') || undefined;
};

type SortedDragItem = {
  id: string;
  rect: DOMRect;
};

const getSortedDragItems = (containerElement: Element): SortedDragItem[] => (
  Array.from(containerElement.querySelectorAll('.pb_draggable_item[data-pb-drag-id]'))
    .map((element) => ({
      id: element.getAttribute('data-pb-drag-id') as string,
      rect: element.getBoundingClientRect(),
    }))
    .sort((a, b) => a.rect.left - b.rect.left)
);

const getDragIdFromElementsAtPoint = (
  clientX: number,
  clientY: number,
  dragId: string,
): string | null => {
  if (typeof document.elementsFromPoint !== 'function') return null;

  return document.elementsFromPoint(clientX, clientY)
    .map((element) => getDragIdFromElement(element))
    .find((id) => id && id !== dragId) ?? null;
};

// When the pointer stays on the dragged item, use sibling midpoints (not the
// dragged pill's own rect) to decide which slot the cursor is in.
const getTargetWhenPointerOnDraggedItem = (
  containerElement: Element,
  clientX: number,
  dragId: string,
): string | null => {
  const items = getSortedDragItems(containerElement);
  const currentIndex = items.findIndex((item) => item.id === dragId);
  if (currentIndex === -1) return null;

  const others = items.filter((item) => item.id !== dragId);
  if (!others.length) return null;

  let slot = 0;
  others.forEach((item, index) => {
    const midpoint = item.rect.left + item.rect.width / 2;
    if (clientX > midpoint) {
      slot = index + 1;
    }
  });

  const desiredIndex = Math.min(slot, items.length - 1);
  if (desiredIndex === currentIndex) return null;

  const targetItem = items[desiredIndex];
  if (!targetItem || targetItem.id === dragId) return null;

  return targetItem.id;
};

export const resolvePointerDragTarget = (
  clientX: number,
  clientY: number,
  dragId: string,
): { targetDragId: string | null; targetContainer: string | undefined } => {
  const elementBelow = typeof document.elementFromPoint === 'function'
    ? document.elementFromPoint(clientX, clientY)
    : null;
  const hitId = getDragIdFromElement(elementBelow);

  if (hitId && hitId !== dragId) {
    return {
      targetDragId: hitId,
      targetContainer: getContainerFromElement(elementBelow),
    };
  }

  const stackId = getDragIdFromElementsAtPoint(clientX, clientY, dragId);
  if (stackId) {
    return {
      targetDragId: stackId,
      targetContainer: getContainerFromElement(elementBelow),
    };
  }

  const containerElement = elementBelow?.closest('.pb_draggable_container');
  if (!containerElement) {
    return { targetDragId: null, targetContainer: undefined };
  }

  return {
    targetDragId: getTargetWhenPointerOnDraggedItem(containerElement, clientX, dragId),
    targetContainer: getContainerFromElement(containerElement),
  };
};

type TouchDragHandlers = {
  onDragStart: (dragId: string, container?: string) => void;
  onDragEnter: (targetDragId: string, container?: string) => void;
  onDragOver: (event: Event, container?: string) => void;
  onDrop: (container?: string) => void;
  onDragEnd: () => void;
};

type TouchDragOptions = {
  dragId: string;
  container?: string;
  itemElement: HTMLElement;
  handlers: TouchDragHandlers;
};

type DragPointerState = {
  active: boolean;
  dragging: boolean;
  startX: number;
  startY: number;
  lastTargetDragId: string | null;
  lastContainer: string | undefined;
};

const createPreventableEvent = (): Event => ({
  preventDefault: () => undefined,
} as Event);

const runDragPointerMove = (
  state: DragPointerState,
  clientX: number,
  clientY: number,
  dragId: string,
  container: string | undefined,
  handlers: TouchDragHandlers,
) => {
  if (!state.dragging) {
    const deltaX = clientX - state.startX;
    const deltaY = clientY - state.startY;

    if (Math.hypot(deltaX, deltaY) < DRAG_THRESHOLD_PX) return false;

    state.dragging = true;
    handlers.onDragStart(dragId, container);
  }

  const { targetDragId, targetContainer } = resolvePointerDragTarget(clientX, clientY, dragId);

  if (!targetDragId || targetDragId === dragId) {
    state.lastTargetDragId = null;
  } else if (targetDragId !== state.lastTargetDragId) {
    state.lastTargetDragId = targetDragId;
    handlers.onDragEnter(targetDragId, targetContainer ?? container);
  }

  if (targetContainer && targetContainer !== state.lastContainer) {
    state.lastContainer = targetContainer;
    handlers.onDragOver(createPreventableEvent(), targetContainer);
  } else if (targetContainer) {
    handlers.onDragOver(createPreventableEvent(), targetContainer);
  }

  return true;
};

const finishDragPointer = (
  state: DragPointerState,
  clientX: number | null,
  clientY: number | null,
  container: string | undefined,
  handlers: TouchDragHandlers,
  itemElement: HTMLElement,
) => {
  if (!state.active) return;

  if (state.dragging && clientX !== null && clientY !== null) {
    const elementBelow = document.elementFromPoint(clientX, clientY);
    const dropContainer = getContainerFromElement(elementBelow) ?? container;

    if (dropContainer) {
      handlers.onDrop(dropContainer);
    }

    handlers.onDragEnd();
  }

  state.active = false;
  state.dragging = false;
  state.lastTargetDragId = null;
  state.lastContainer = undefined;
  itemElement.classList.remove('is_touch_active');
};

export const bindTouchDrag = ({
  dragId,
  container,
  itemElement,
  handlers,
}: TouchDragOptions): (() => void) => {
  if (!isTouchDragDevice()) {
    return () => undefined;
  }

  const handle = itemElement.querySelector(DRAG_HANDLE_SELECTOR) as HTMLElement | null;
  const dragTarget = handle || itemElement;

  const state: DragPointerState = {
    active: false,
    dragging: false,
    startX: 0,
    startY: 0,
    lastTargetDragId: null,
    lastContainer: undefined,
  };

  const handleTouchStart = (event: TouchEvent) => {
    if (handle && !handle.contains(event.target as Node)) {
      return;
    }

    const touch = event.touches[0];
    if (!touch) return;

    state.active = true;
    state.startX = touch.clientX;
    state.startY = touch.clientY;
    itemElement.classList.add('is_touch_active');
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (!state.active) return;

    const touch = event.touches[0];
    if (!touch) return;

    if (runDragPointerMove(state, touch.clientX, touch.clientY, dragId, container, handlers)) {
      event.preventDefault();
    }
  };

  const finishDrag = (touch: Touch | null) => {
    finishDragPointer(
      state,
      touch?.clientX ?? null,
      touch?.clientY ?? null,
      container,
      handlers,
      itemElement,
    );
  };

  const handleTouchEnd = (event: TouchEvent) => {
    finishDrag(event.changedTouches[0] ?? null);
  };

  const handleTouchCancel = (event: TouchEvent) => {
    if (state.dragging) {
      handlers.onDragEnd();
    }

    finishDrag(event.changedTouches[0] ?? null);
  };

  dragTarget.addEventListener('touchstart', handleTouchStart, { passive: true });
  dragTarget.addEventListener('touchmove', handleTouchMove, { passive: false });
  dragTarget.addEventListener('touchend', handleTouchEnd, { passive: true });
  dragTarget.addEventListener('touchcancel', handleTouchCancel, { passive: true });

  return () => {
    dragTarget.removeEventListener('touchstart', handleTouchStart);
    dragTarget.removeEventListener('touchmove', handleTouchMove);
    dragTarget.removeEventListener('touchend', handleTouchEnd);
    dragTarget.removeEventListener('touchcancel', handleTouchCancel);
  };
};

const DRAG_INTERACTION_EXCLUDE_SELECTOR = '.pb_form_pill_close';

const isHandleEventTarget = (target: EventTarget | null): boolean => {
  return Boolean((target as Element | null)?.closest(DRAG_HANDLE_SELECTOR));
};

const isExcludedDragTarget = (target: EventTarget | null): boolean => {
  return Boolean((target as Element | null)?.closest(DRAG_INTERACTION_EXCLUDE_SELECTOR));
};

type MousePointerDragOptions = TouchDragOptions & {
  allowWholeItem?: boolean;
};

export const bindMousePointerDrag = ({
  dragId,
  container,
  itemElement,
  handlers,
  allowWholeItem = false,
}: MousePointerDragOptions): (() => void) => {
  const hasHandle = Boolean(itemElement.querySelector(DRAG_HANDLE_SELECTOR));

  if (!hasHandle && !allowWholeItem) {
    return () => undefined;
  }

  const state: DragPointerState = {
    active: false,
    dragging: false,
    startX: 0,
    startY: 0,
    lastTargetDragId: null,
    lastContainer: undefined,
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!state.active) return;

    if (runDragPointerMove(state, event.clientX, event.clientY, dragId, container, handlers)) {
      event.preventDefault();
    }
  };

  const handleMouseUp = (event: MouseEvent) => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);

    finishDragPointer(
      state,
      event.clientX,
      event.clientY,
      container,
      handlers,
      itemElement,
    );
  };

  const handleMouseDown = (event: MouseEvent) => {
    if (event.button !== 0) return;
    if (isExcludedDragTarget(event.target)) return;

    if (hasHandle) {
      if (!isHandleEventTarget(event.target)) return;
    } else if (!itemElement.contains(event.target as Node)) {
      return;
    }

    // Pointer drag only — HTML5 drag is disabled on these items. preventDefault stops text selection.
    event.preventDefault();
    event.stopPropagation();

    state.active = true;
    state.startX = event.clientX;
    state.startY = event.clientY;
    itemElement.classList.add('is_touch_active');
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Delegate on the stable draggable item element so re-rendered handles stay wired
  itemElement.addEventListener('mousedown', handleMouseDown);

  return () => {
    itemElement.removeEventListener('mousedown', handleMouseDown);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
};

export const bindMouseHandleDrag = bindMousePointerDrag;
