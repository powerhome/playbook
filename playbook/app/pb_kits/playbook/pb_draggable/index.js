import PbEnhancedElement from "../pb_enhanced_element";

const DRAGGABLE_SELECTOR = "[data-pb-draggable]";
const DRAGGABLE_CONTAINER = ".pb_draggable_container";

export default class PbDraggable extends PbEnhancedElement {
  static get selector() {
    return DRAGGABLE_SELECTOR;
  }

  connect() {
    this.draggedItem = null;
    this.draggedItemId = null;
    document.addEventListener("DOMContentLoaded", () => this.bindEventListeners());
  }

  bindEventListeners() {
    this.element.querySelectorAll(".pb_draggable_item").forEach(item => {
      item.addEventListener("dragstart", this.handleDragStart.bind(this));
      item.addEventListener("dragend", this.handleDragEnd.bind(this));
      item.addEventListener("dragenter", this.handleDragEnter.bind(this));
    });

    const container = this.element.querySelector(DRAGGABLE_CONTAINER);
    if (container) {
      container.addEventListener("dragover", this.handleDragOver.bind(this));
      container.addEventListener("drop", this.handleDrop.bind(this));
    }
  }

  handleDragStart(event) {
    this.draggedItem = event.target;
    this.draggedItemId = event.target.id;
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
    const container = event.target.closest(DRAGGABLE_CONTAINER);

    if (container) {
      container.classList.add("active_container");
    }
  }

  handleDrop(event) {
    event.preventDefault();
    const container = event.target.closest(DRAGGABLE_CONTAINER);
    if (!container || !this.draggedItem) return;

    container.classList.remove("active_container");
    this.draggedItem.style.opacity = '1';

    const customEvent = new CustomEvent('pb-draggable-reorder', {
      detail: {
        itemId: this.draggedItemId,
        containerId: container.id,
        newIndex: Array.from(container.children).indexOf(this.draggedItem)
      }
    });
    this.element.dispatchEvent(customEvent);
  }

  handleDragEnd(event) {
    event.target.classList.remove("is_dragging");
    event.target.style.opacity = '1';
    this.draggedItem = null;
    this.draggedItemId = null;

    this.element.querySelectorAll(DRAGGABLE_CONTAINER).forEach(container => {
      container.classList.remove("active_container");
    });
  }
}
