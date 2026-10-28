const ROW_TOLERANCE = 80;
const DRAG_THRESHOLD_PX = 5;
const DRAG_HANDLE_SELECTOR = ".pb_draggable_handle, .pb_dropdown_external_drag_handle";
const CLOSE_SELECTOR = ".pb_form_pill_close";

let lastPointer = null;
let pointerTrackingInstalled = false;

const ensurePointerTracking = () => {
  if (pointerTrackingInstalled || typeof document === "undefined") return;
  pointerTrackingInstalled = true;

  document.addEventListener("mousemove", (event) => {
    if (event.buttons === 0) return;
    lastPointer = { x: event.clientX, y: event.clientY };
  }, true);

  document.addEventListener("touchmove", (event) => {
    const touch = event.touches[0];
    if (touch) lastPointer = { x: touch.clientX, y: touch.clientY };
  }, { capture: true, passive: true });
};

const getVerticalDistance = (rect, y) => Math.max(rect.top - y, y - rect.bottom, 0);

export const getDropTarget = (pills, x, y) => {
  if (pills.length === 0) return null;

  const rects = pills.map((pill) => pill.getBoundingClientRect());
  const nearestRect = rects.reduce((nearest, rect) => (
    getVerticalDistance(rect, y) < getVerticalDistance(nearest, y) ? rect : nearest
  ));
  if (getVerticalDistance(nearestRect, y) > ROW_TOLERANCE) return null;

  const rowIndexes = rects
    .map((rect, index) => ({ index, rect }))
    .filter(({ rect }) => rect.top < nearestRect.bottom && rect.bottom > nearestRect.top)
    .map(({ index }) => index);

  const pillAfterPointer = rowIndexes.find((index) => x < rects[index].left + rects[index].width / 2);
  if (pillAfterPointer !== undefined) {
    return { after: false, index: pillAfterPointer };
  }

  return { after: true, index: rowIndexes[rowIndexes.length - 1] };
};

const clearDropLines = (pills) => {
  pills.forEach((pill) => {
    pill.classList.remove("pb_dropdown_drop_before", "pb_dropdown_drop_after");
  });
};

const applyDropLine = (pills, target) => {
  clearDropLines(pills);
  if (!target) return;
  pills[target.index]?.classList.add(
    target.after ? "pb_dropdown_drop_after" : "pb_dropdown_drop_before",
  );
};

/**
 * Bind pointer-drag reordering for multi-select pills.
 * @returns {() => void} cleanup
 */
export const bindPillReorder = ({
  container,
  getOrderedIds,
  onReorder,
  externalDragHandle = false,
}) => {
  if (!container) return () => undefined;

  ensurePointerTracking();

  let pendingReorder = null;
  let activeItem = null;
  let ghost = null;
  let dragId = null;
  let startX = 0;
  let startY = 0;
  let dragging = false;
  const cleanups = [];

  const removeGhost = () => {
    ghost?.remove();
    ghost = null;
  };

  const endDrag = () => {
    const pills = Array.from(container.querySelectorAll(".pb_draggable_item"));
    clearDropLines(pills);
    container.classList.remove("active");
    activeItem?.classList.remove("is_dragging");
    removeGhost();

    if (pendingReorder) {
      onReorder(pendingReorder);
      pendingReorder = null;
    }

    activeItem = null;
    dragId = null;
    dragging = false;
  };

  const updatePointer = (x, y) => {
    if (!dragging || !activeItem || !ghost) return;

    const pills = Array.from(container.querySelectorAll(".pb_draggable_item"));
    const orderedIds = getOrderedIds();
    const sourceIndex = orderedIds.indexOf(dragId);
    if (sourceIndex < 0) return;

    const originX = parseFloat(ghost.dataset.originX || "0");
    const originY = parseFloat(ghost.dataset.originY || "0");
    ghost.style.translate = `${x - originX}px ${y - originY}px`;

    const target = getDropTarget(pills, x, y);
    const targetSlot = target ? target.index + Number(target.after) : -1;
    const isCurrentPosition = targetSlot === sourceIndex || targetSlot === sourceIndex + 1;

    if (!target || isCurrentPosition) {
      pendingReorder = null;
      clearDropLines(pills);
      return;
    }

    const reordered = orderedIds.filter((id) => id !== dragId);
    reordered.splice(targetSlot > sourceIndex ? targetSlot - 1 : targetSlot, 0, dragId);
    pendingReorder = reordered;
    applyDropLine(pills, target);
  };

  const startDrag = (item, clientX, clientY) => {
    dragging = true;
    activeItem = item;
    dragId = item.getAttribute("data-pb-drag-id");
    pendingReorder = null;
    container.classList.add("active");
    item.classList.add("is_dragging");

    const sourceRect = item.getBoundingClientRect();
    ghost = item.cloneNode(true);
    ghost.className = "pb_dropdown_pill_drag_preview";
    ghost.setAttribute("inert", "");
    ghost.style.left = `${sourceRect.left}px`;
    ghost.style.top = `${sourceRect.top}px`;
    ghost.style.width = `${sourceRect.width}px`;
    ghost.dataset.originX = String(sourceRect.left + sourceRect.width / 2);
    ghost.dataset.originY = String(sourceRect.top + sourceRect.height / 2);
    document.body.appendChild(ghost);

    updatePointer(clientX, clientY);
    if (lastPointer) updatePointer(lastPointer.x, lastPointer.y);
  };

  const handleMouseMove = (event) => {
    if (!activeItem) return;

    if (!dragging) {
      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;
      if (Math.hypot(deltaX, deltaY) < DRAG_THRESHOLD_PX) return;
      startDrag(activeItem, event.clientX, event.clientY);
    }

    updatePointer(event.clientX, event.clientY);
    event.preventDefault();
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    endDrag();
  };

  const handleMouseDown = (event) => {
    if (event.button !== 0) return;
    const item = event.target.closest(".pb_draggable_item");
    if (!item || !container.contains(item)) return;
    if (event.target.closest(CLOSE_SELECTOR)) return;

    if (externalDragHandle) {
      if (!event.target.closest(DRAG_HANDLE_SELECTOR)) return;
    }

    event.preventDefault();
    event.stopPropagation();

    activeItem = item;
    dragId = item.getAttribute("data-pb-drag-id");
    startX = event.clientX;
    startY = event.clientY;
    dragging = false;
    pendingReorder = null;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  container.addEventListener("mousedown", handleMouseDown);
  cleanups.push(() => {
    container.removeEventListener("mousedown", handleMouseDown);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    removeGhost();
  });

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
};
