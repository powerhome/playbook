export const DRAG_HANDLE_SELECTOR = '.pb_draggable_handle, .card_draggable_handle';

const DRAG_THRESHOLD_PX = 5;

export const isTouchDragDevice = (): boolean => {
  if (typeof window === 'undefined') return false;

  const hasTouch = 'ontouchstart' in window;
  const hasCoarsePointer =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  return hasTouch || hasCoarsePointer;
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

type TouchDragState = {
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

export const bindTouchDrag = ({
  dragId,
  container,
  itemElement,
  handlers,
}: TouchDragOptions): (() => void) => {
  if (!isTouchDragDevice()) return () => undefined;

  const handle = itemElement.querySelector(DRAG_HANDLE_SELECTOR) as HTMLElement | null;
  const dragTarget = handle || itemElement;

  const state: TouchDragState = {
    active: false,
    dragging: false,
    startX: 0,
    startY: 0,
    lastTargetDragId: null,
    lastContainer: undefined,
  };

  const resetState = () => {
    state.active = false;
    state.dragging = false;
    state.lastTargetDragId = null;
    state.lastContainer = undefined;
    itemElement.classList.remove('is_touch_active');
  };

  const handleTouchStart = (event: TouchEvent) => {
    if (handle && !handle.contains(event.target as Node)) return;

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

    if (!state.dragging) {
      const deltaX = touch.clientX - state.startX;
      const deltaY = touch.clientY - state.startY;

      if (Math.hypot(deltaX, deltaY) < DRAG_THRESHOLD_PX) return;

      state.dragging = true;
      handlers.onDragStart(dragId, container);
    }

    event.preventDefault();

    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
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
  };

  const finishDrag = (touch: Touch | null) => {
    if (!state.active) return;

    if (state.dragging && touch) {
      const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
      const dropContainer = getContainerFromElement(elementBelow) ?? container;

      if (dropContainer) {
        handlers.onDrop(dropContainer);
      }

      handlers.onDragEnd();
    }

    resetState();
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
