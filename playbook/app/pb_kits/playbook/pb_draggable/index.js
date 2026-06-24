import PbEnhancedElement from "../pb_enhanced_element";

const DRAGGABLE_SELECTOR  = "[data-pb-draggable]";
const DRAGGABLE_CONTAINER = ".pb_draggable_container";
const DRAG_HANDLE_SELECTOR = ".pb_draggable_handle, .card_draggable_handle";
const NEEDS_CLONE         = ["shadow", "outline", "line"];   // clone only for these types
const DRAG_THRESHOLD_PX   = 5;

const isTouchDragDevice = () => {
  const hasTouch = "ontouchstart" in window;
  const hasCoarsePointer =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  return hasTouch || hasCoarsePointer;
};

const getDragIdFromElement = (element) => {
  const item = element?.closest(".pb_draggable_item");
  if (!item) return null;

  return item.getAttribute("data-pb-drag-id") || item.id;
};

const getContainerFromElement = (element) => {
  const container = element?.closest(DRAGGABLE_CONTAINER);
  if (!container) return null;

  return container.getAttribute("data-pb-drag-container") || container.id;
};

export default class PbDraggable extends PbEnhancedElement {
  static get selector() { return DRAGGABLE_SELECTOR; }

  connect() {
    this.state = {
      items:        [],
      dragData:     { id: "", initialGroup: "" },
      isDragging:   "",
      activeContainer: "",
    };

    this.draggedItem   = null;
    this.draggedItemId = null;
    this.dragGhost     = null;
    this.hasMultipleContainers = false;
    this.dragZoneType  = "";
    this.dragZoneColor = "";
    this.useTouchDrag = isTouchDragDevice();
    this.touchCleanups = [];

    // If DOM is already loaded, bind immediately; otherwise wait for DOMContentLoaded
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.bindEventListeners());
    } else {
      this.bindEventListeners();
    }
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    if (newState.items) {
      this.element.dispatchEvent(new CustomEvent("pb-draggable-reorder", {
        detail: {
          reorderedItems: this.state.items,
          containerId:    this.element.querySelector(DRAGGABLE_CONTAINER).id,
        },
      }));
    }
  }

  bindEventListeners() {
    // Check for multiple containers
    const containers = this.element.querySelectorAll(DRAGGABLE_CONTAINER);
    this.hasMultipleContainers = containers.length > 1;

    // Needed to prevent images within draggable items from being independently draggable
    // Needed if using Image kit in draggable items
    this.element.querySelectorAll(".pb_draggable_item img")
      .forEach(img => img.setAttribute("draggable", "false"));

    this.element.querySelectorAll(".pb_draggable_item")
      .forEach(item => {
        if (this.useTouchDrag) {
          item.setAttribute("draggable", "false");
          this.touchCleanups.push(this.bindTouchDragForItem(item));
        } else {
          item.addEventListener("dragstart", this.handleDragStart.bind(this));
          item.addEventListener("dragend",   this.handleDragEnd.bind(this));
          item.addEventListener("dragenter", this.handleDragEnter.bind(this));
        }
      });

    containers.forEach(c => {
      c.addEventListener("dragover", this.handleDragOver.bind(this));
      c.addEventListener("drop",     this.handleDrop.bind(this));
    });
  }

  bindTouchDragForItem(item) {
    const handle = item.querySelector(DRAG_HANDLE_SELECTOR);
    const dragTarget = handle || item;
    const isWithinThisDraggable = (element) =>
      element && this.element.contains(element);
    const state = {
      active: false,
      dragging: false,
      startX: 0,
      startY: 0,
      lastTargetDragId: null,
    };

    const resetState = () => {
      state.active = false;
      state.dragging = false;
      state.lastTargetDragId = null;
      item.classList.remove("is_touch_active");
    };

    const pointerEventFromTouch = (touch, target) => ({
      target,
      clientX: touch.clientX,
      clientY: touch.clientY,
      preventDefault: () => undefined,
      stopPropagation: () => undefined,
    });

    const onTouchStart = (event) => {
      if (handle && !handle.contains(event.target)) return;

      const touch = event.touches[0];
      if (!touch) return;

      state.active = true;
      state.startX = touch.clientX;
      state.startY = touch.clientY;
      item.classList.add("is_touch_active");
    };

    const onTouchMove = (event) => {
      if (!state.active) return;

      const touch = event.touches[0];
      if (!touch) return;

      if (!state.dragging) {
        const deltaX = touch.clientX - state.startX;
        const deltaY = touch.clientY - state.startY;

        if (Math.hypot(deltaX, deltaY) < DRAG_THRESHOLD_PX) return;

        state.dragging = true;
        this.handleDragStart(pointerEventFromTouch(touch, item));
      }

      event.preventDefault();

      const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
      if (!isWithinThisDraggable(elementBelow)) return;

      const targetItem = elementBelow?.closest(".pb_draggable_item");
      const targetDragId = getDragIdFromElement(elementBelow);

      if (targetItem && targetItem !== item && targetDragId !== state.lastTargetDragId) {
        state.lastTargetDragId = targetDragId;
        this.handleDragEnter(pointerEventFromTouch(touch, targetItem));
      }

      const targetContainer = getContainerFromElement(elementBelow);
      if (targetContainer) {
        const containerElement = elementBelow.closest(DRAGGABLE_CONTAINER);
        if (containerElement && isWithinThisDraggable(containerElement)) {
          this.handleDragOver(pointerEventFromTouch(touch, containerElement));
        }
      }
    };

    const finishTouchDrag = (touch) => {
      if (!state.active) return;

      if (state.dragging && touch) {
        const sourceContainer = item.closest(DRAGGABLE_CONTAINER);
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        const containerElement = isWithinThisDraggable(elementBelow)
          ? elementBelow?.closest(DRAGGABLE_CONTAINER)
          : sourceContainer;

        if (containerElement && isWithinThisDraggable(containerElement)) {
          this.handleDrop(pointerEventFromTouch(touch, containerElement));
        }

        this.handleDragEnd({ target: item });
      }

      resetState();
    };

    const onTouchEnd = (event) => finishTouchDrag(event.changedTouches[0]);
    const onTouchCancel = (event) => finishTouchDrag(event.changedTouches[0]);

    dragTarget.addEventListener("touchstart", onTouchStart, { passive: true });
    dragTarget.addEventListener("touchmove", onTouchMove, { passive: false });
    dragTarget.addEventListener("touchend", onTouchEnd, { passive: true });
    dragTarget.addEventListener("touchcancel", onTouchCancel, { passive: true });

    return () => {
      dragTarget.removeEventListener("touchstart", onTouchStart);
      dragTarget.removeEventListener("touchmove", onTouchMove);
      dragTarget.removeEventListener("touchend", onTouchEnd);
      dragTarget.removeEventListener("touchcancel", onTouchCancel);
    };
  }

  /* ---------------- DRAG START ---------------- */
  handleDragStart(event) {
    const item = event.target.closest(".pb_draggable_item");
    if (!item) return;

    // Needed to prevent images within draggable items from being independently draggable
    // Needed if using Image kit in draggable items
    if (event.target.tagName.toLowerCase() === "img") {
      event.preventDefault();
      return;
    }

    const container    = item.closest(DRAGGABLE_CONTAINER);
    this.draggedItem   = item;
    this.draggedItemId = getDragIdFromElement(item);
    this.dragZoneType  = this.element.dataset.dropZoneType  || "";
    this.dragZoneColor = this.element.dataset.dropZoneColor || "";

    this.setState({
      dragData:   { id: this.draggedItemId, initialGroup: container.id },
      isDragging: this.draggedItemId,
    });

    this.draggedItem.classList.add(
      "is_dragging",
      `drop_zone_${this.dragZoneType}`,
      `drop_zone_color_${this.dragZoneColor}`,
    );

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", this.draggedItemId);

      /* ---------- custom ghost clone (shadow + outline only) ---------- */
      if (NEEDS_CLONE.includes(this.dragZoneType)) {
        const ghost = this.draggedItem.cloneNode(true);
        ghost.classList.remove(
          "is_dragging",
          `drop_zone_${this.dragZoneType}`,
          `drop_zone_color_${this.dragZoneColor}`,
        );
        const { width, height } = this.draggedItem.getBoundingClientRect();
        Object.assign(ghost.style, {
          border:    "none",
          width:     `${width}px`,
          height:    `${height}px`,
          position:  "absolute",
          top:      "-9999px",
          left:     "-9999px",
          boxSizing: "border-box",
          zIndex:    "9999",
        });
        document.body.appendChild(ghost);
        this.dragGhost = ghost;
        event.dataTransfer.setDragImage(ghost, width / 2, height / 2);
      }
      /* ---------------------------------------------------------------- */
    }

    if (this.dragZoneType !== "line") {
      requestAnimationFrame(() => (item.style.opacity = "0.5"));
    }
  }

  /* ---------------- DRAG ENTER ---------------- */
  handleDragEnter(event) {
    if (!this.draggedItem || event.target === this.draggedItem) return;
    this.hasMultipleContainers
      ? this.handleMultiContainerDragEnter(event)
      : this.handleSingleContainerDragEnter(event);
  }

  handleSingleContainerDragEnter(event) {
    const targetItem = event.target.closest(".pb_draggable_item");
    // If we're entering a container directly or there's no target item
    if (!targetItem) return;

    const container = targetItem.parentNode;
    const items     = Array.from(container.children);
    const fromIdx   = items.indexOf(this.draggedItem);
    const toIdx     = items.indexOf(targetItem);

    if (fromIdx > toIdx) {
      container.insertBefore(this.draggedItem, targetItem);
    } else {
      container.insertBefore(this.draggedItem, targetItem.nextSibling);
    }
  }

  handleMultiContainerDragEnter(event) {
    const targetContainer = event.target.closest(DRAGGABLE_CONTAINER);
    const targetItem      = event.target.closest(".pb_draggable_item");
    if (!targetContainer) return;

    if (!targetItem) {
      const last = targetContainer.querySelector(".pb_draggable_item:last-child");
      last
        ? targetContainer.insertBefore(this.draggedItem, last.nextSibling)
        : targetContainer.appendChild(this.draggedItem);
      return;
    }

    const items = Array.from(targetContainer.children);
    this.setState({ items: items.map(i => ({ id: i.id, container: targetContainer.id })) });

    const midY = targetItem.getBoundingClientRect().top +
                 targetItem.getBoundingClientRect().height / 2;

    if (event.clientY < midY) {
      targetContainer.insertBefore(this.draggedItem, targetItem);
    } else {
      targetContainer.insertBefore(this.draggedItem, targetItem.nextSibling);
    }
  }

  /* ---------------- DRAG OVER ---------------- */
  handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    this.hasMultipleContainers
      ? this.handleMultiContainerDragOver(event)
      : this.handleSingleContainerDragOver(event);
  }

  handleSingleContainerDragOver(event) {
    const container = event.target.closest(DRAGGABLE_CONTAINER);
    if (container) container.classList.add("active_container");
  }

  handleMultiContainerDragOver(event) {
    const container = event.target.matches(DRAGGABLE_CONTAINER)
      ? event.target
      : event.target.closest(DRAGGABLE_CONTAINER);
    if (!container) return;

    this.setState({ activeContainer: container.id });
    container.classList.add("active_container");

    const last = container.querySelector(".pb_draggable_item:last-child");
    if (!last || event.clientY > last.getBoundingClientRect().bottom) {
      if (this.draggedItem && this.draggedItem.parentNode !== container) {
        container.appendChild(this.draggedItem);
      }
    }
  }

  /* ---------------- DROP ---------------- */
  handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    const container = event.target.matches(DRAGGABLE_CONTAINER)
      ? event.target
      : event.target.closest(DRAGGABLE_CONTAINER);
    if (!container || !this.draggedItem) return;

    container.classList.remove("active_container");
    this.draggedItem.style.opacity = "1";

    // Handle empty containers
    if (this.hasMultipleContainers && !container.querySelector(".pb_draggable_item")) {
      container.appendChild(this.draggedItem);
    }

    // Updated order of items as an array of item IDs
    const reorderedItems = Array.from(this.element.querySelectorAll(".pb_draggable_item"))
      .map(i => ({ id: i.id, container: i.closest(DRAGGABLE_CONTAINER).id }));

    container.dataset.reorderedItems = JSON.stringify(reorderedItems);
    this.element.dispatchEvent(new CustomEvent("pb-draggable-reorder", {
      detail: { reorderedItems, containerId: container.id },
    }));

    this.setState({ items: reorderedItems, isDragging: "", activeContainer: "" });
    this.draggedItem   = null;
    this.draggedItemId = null;
  }

  /* ---------------- DRAG END ---------------- */
  handleDragEnd(event) {
    event.target.classList.remove(
      "is_dragging",
      `drop_zone_${this.dragZoneType}`,
      `drop_zone_color_${this.dragZoneColor}`,
    );
    event.target.style.opacity = "1";

    if (this.dragGhost) {
      document.body.removeChild(this.dragGhost);
      this.dragGhost = null;
    }

    this.setState({ isDragging: "", activeContainer: "" });

    this.element.querySelectorAll(DRAGGABLE_CONTAINER)
      .forEach(c => c.classList.remove("active_container"));

    this.draggedItem   = null;
    this.draggedItemId = null;
  }
}
