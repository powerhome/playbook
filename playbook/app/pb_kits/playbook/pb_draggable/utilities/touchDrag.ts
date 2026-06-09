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

  const elementBelow = document.elementFromPoint(clientX, clientY);
  const targetDragId = getDragIdFromElement(elementBelow);
  const targetContainer = getContainerFromElement(elementBelow);

  if (targetDragId && targetDragId !== dragId && targetDragId !== state.lastTargetDragId) {
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

const isHandleEventTarget = (target: EventTarget | null): boolean => {
  return Boolean((target as Element | null)?.closest(DRAG_HANDLE_SELECTOR));
};

export const bindMouseHandleDrag = ({
  dragId,
  container,
  itemElement,
  handlers,
}: TouchDragOptions): (() => void) => {
  const hasHandle = Boolean(itemElement.querySelector(DRAG_HANDLE_SELECTOR));
  if (!hasHandle) {
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

  const handleMouseDown = (event: MouseEvent) => {
    if (event.button !== 0) return;
    if (!isHandleEventTarget(event.target)) return;

    // stopPropagation only — preventDefault here blocks HTML5 drag on ancestors
    event.stopPropagation();

    state.active = true;
    state.startX = event.clientX;
    state.startY = event.clientY;
    itemElement.classList.add('is_touch_active');
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!state.active) return;

    if (runDragPointerMove(state, event.clientX, event.clientY, dragId, container, handlers)) {
      event.preventDefault();
    }
  };

  const handleMouseUp = (event: MouseEvent) => {
    finishDragPointer(
      state,
      event.clientX,
      event.clientY,
      container,
      handlers,
      itemElement,
    );
  };

  // Delegate on the stable draggable item element so re-rendered handles stay wired
  itemElement.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);

  return () => {
    itemElement.removeEventListener('mousedown', handleMouseDown);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
};
