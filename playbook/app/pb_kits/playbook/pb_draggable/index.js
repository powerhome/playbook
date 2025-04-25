import PbEnhancedElement from "../pb_enhanced_element";

const DRAGGABLE_SELECTOR  = "[data-pb-draggable]";
const DRAGGABLE_CONTAINER = ".pb_draggable_container";
const NEEDS_CLONE         = ["shadow", "outline"];   // clone only for these types

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

    document.addEventListener("DOMContentLoaded", () => this.bindEventListeners());
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
        item.addEventListener("dragstart", this.handleDragStart.bind(this));
        item.addEventListener("dragend",   this.handleDragEnd.bind(this));
        item.addEventListener("dragenter", this.handleDragEnter.bind(this));
      });

    containers.forEach(c => {
      c.addEventListener("dragover", this.handleDragOver.bind(this));
      c.addEventListener("drop",     this.handleDrop.bind(this));
    });
  }

  /* ---------------- DRAG START ---------------- */
  handleDragStart(event) {
    // Needed to prevent images within draggable items from being independently draggable
    // Needed if using Image kit in draggable items
    if (event.target.tagName.toLowerCase() === "img") {
      event.preventDefault();
      return;
    }

    const container    = event.target.closest(DRAGGABLE_CONTAINER);
    this.draggedItem   = event.target;
    this.draggedItemId = event.target.id;
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

    requestAnimationFrame(() => (event.target.style.opacity = "0.5"));
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
