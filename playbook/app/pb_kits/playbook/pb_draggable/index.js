import PbEnhancedElement from "../pb_enhanced_element";

const DRAGGABLE_SELECTOR = "[data-pb-draggable]";
const DRAGGABLE_CONTAINER = ".pb_draggable_container";

export default class PbDraggable extends PbEnhancedElement {
  static get selector() {
    return DRAGGABLE_SELECTOR;
  }

  connect() {
    this.state = {
      items: [],
      dragData: { id: "", initialGroup: "" },
      isDragging: "",
      activeContainer: ""
    };

    this.draggedItem = null;
    this.draggedItemId = null;

    document.addEventListener("DOMContentLoaded", () => this.bindEventListeners());
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    if (newState.items) {
      const customEvent = new CustomEvent('pb-draggable-reorder', {
        detail: {
          reorderedItems: this.state.items,
          containerId: this.element.querySelector(DRAGGABLE_CONTAINER).id
        }
      });
      this.element.dispatchEvent(customEvent);
    }
  }

  bindEventListeners() {
    // Needed to prevent images within draggable items from being independently draggable
    // Needed if using Image kit in draggable items
    this.element.querySelectorAll(".pb_draggable_item img").forEach(img => {
      img.setAttribute("draggable", "false");
    });

    this.element.querySelectorAll(".pb_draggable_item").forEach(item => {
      item.addEventListener("dragstart", this.handleDragStart.bind(this));
      item.addEventListener("dragend", this.handleDragEnd.bind(this));
      item.addEventListener("dragenter", this.handleDragEnter.bind(this));
    });

    const containers = this.element.querySelectorAll(DRAGGABLE_CONTAINER);
    containers.forEach(container => {
      container.addEventListener("dragover", this.handleDragOver.bind(this));
      container.addEventListener("drop", this.handleDrop.bind(this));
    });
  }

  handleDragStart(event) {
    // Needed to prevent images within draggable items from being independently draggable
    // Needed if using Image kit in draggable items
    if (event.target.tagName.toLowerCase() === 'img') {
      event.preventDefault();
      return;
    }

    const container = event.target.closest(DRAGGABLE_CONTAINER);
    this.draggedItem = event.target;
    this.draggedItemId = event.target.id;

    this.setState({
      dragData: { id: this.draggedItemId, initialGroup: container.id },
      isDragging: this.draggedItemId
    });

    event.target.classList.add("is_dragging");
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', this.draggedItemId);
    }

    setTimeout(() => {
      event.target.style.opacity = '0.5';
    }, 0);
  }

  handleDragEnter(event) {
    if (!this.draggedItem || event.target === this.draggedItem) return;

    const targetItem = event.target.closest('.pb_draggable_item');
    if (!targetItem) return;

    const container = targetItem.parentNode;
    const items = Array.from(container.children);

    const newItems = [...items].map(item => ({
      id: item.id,
      container: container.id
    }));

    this.setState({ items: newItems });

    const draggedIndex = items.indexOf(this.draggedItem);
    const targetIndex = items.indexOf(targetItem);

    if (draggedIndex > targetIndex) {
      container.insertBefore(this.draggedItem, targetItem);
    } else {
      container.insertBefore(this.draggedItem, targetItem.nextSibling);
    }
  }

  handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();

    let container;
    if (event.target.matches(DRAGGABLE_CONTAINER)) {
      container = event.target;
    } else {
      container = event.target.closest(DRAGGABLE_CONTAINER);
    }

    if (container) {
      this.setState({ activeContainer: container.id });
      container.classList.add("active_container");
    }
  }

  handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    let container;

    if (event.target.matches(DRAGGABLE_CONTAINER)) {
      container = event.target;
    } else {
      container = event.target.closest(DRAGGABLE_CONTAINER);
    }

    if (!container || !this.draggedItem) return;

    container.classList.remove("active_container");
    this.draggedItem.style.opacity = '1';

    // Handle empty containers
    if (!container.querySelector('.pb_draggable_item')) {
      container.appendChild(this.draggedItem);
    }

    // Updated order of items as an array of item IDs
    const reorderedItems = Array.from(
      this.element.querySelectorAll('.pb_draggable_item')
    ).map(item => ({
      id: item.id,
      container: item.closest(DRAGGABLE_CONTAINER).id
    }));

    // Store reordered items in a data attribute on the container
    container.setAttribute("data-reordered-items", JSON.stringify(reorderedItems));

    const customEvent = new CustomEvent('pb-draggable-reorder', {
      detail: {
        reorderedItems,
        containerId: container.id,
      }
    });

    this.element.dispatchEvent(customEvent);

    this.setState({
      items: reorderedItems,  // Changed from reorderedItems to items to match setState
      isDragging: "",
      activeContainer: ""
    });

    this.draggedItem = null;
    this.draggedItemId = null;
  }

  handleDragEnd(event) {
    event.target.classList.remove("is_dragging");
    event.target.style.opacity = '1';

    this.setState({
      isDragging: "",
      activeContainer: ""
    });

    this.draggedItem = null;
    this.draggedItemId = null;

    this.element.querySelectorAll(DRAGGABLE_CONTAINER).forEach(container => {
      container.classList.remove("active_container");
    });
  }
}
