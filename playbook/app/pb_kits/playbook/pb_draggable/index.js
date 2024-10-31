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
    this.placeholder = this.createPlaceholder();
    document.addEventListener("DOMContentLoaded", () => this.bindEventListeners());
  }

  createPlaceholder() {
    const placeholder = document.createElement('div');
    placeholder.classList.add('pb_draggable_placeholder');
    placeholder.style.height = '0';
    placeholder.style.transition = 'height 0.2s';
    return placeholder;
  }

  bindEventListeners() {
    this.element.querySelectorAll(".pb_draggable_item").forEach(item => {
      item.addEventListener("dragstart", this.handleDragStart.bind(this));
      item.addEventListener("dragend", this.handleDragEnd.bind(this));
      item.addEventListener("dragenter", this.handleDragEnter.bind(this));
      item.addEventListener("dragleave", this.handleDragLeave.bind(this));
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
    
    // Store initial height for placeholder
    const rect = event.target.getBoundingClientRect();
    this.placeholder.style.height = `${rect.height}px`;
    
    // Set drag image
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
    const items = [...container.children];
    const draggedIndex = items.indexOf(this.draggedItem);
    const targetIndex = items.indexOf(targetItem);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      // Remove existing placeholder
      this.placeholder.remove();
      
      // Insert placeholder based on mouse position
      const rect = targetItem.getBoundingClientRect();
      const midpoint = rect.top + rect.height / 2;
      
      if (event.clientY < midpoint) {
        targetItem.parentNode.insertBefore(this.placeholder, targetItem);
      } else {
        targetItem.parentNode.insertBefore(this.placeholder, targetItem.nextSibling);
      }
    }
  }

  handleDragLeave(event) {
    if (event.target.closest(DRAGGABLE_CONTAINER) !== event.relatedTarget?.closest(DRAGGABLE_CONTAINER)) {
      this.placeholder.remove();
    }
  }

  handleDragOver(event) {
    event.preventDefault();
    const container = event.target.closest(DRAGGABLE_CONTAINER);
    if (container) {
      container.classList.add("active_container");
      
      // Handle empty container
      if (!container.querySelector('.pb_draggable_item:not(.is_dragging)')) {
        container.appendChild(this.placeholder);
      }
    }
  }

  handleDrop(event) {
    event.preventDefault();
    const container = event.target.closest(DRAGGABLE_CONTAINER);
    if (!container || !this.draggedItem) return;

    container.classList.remove("active_container");
    this.draggedItem.style.opacity = '1';
    
    // Replace placeholder with dragged item
    if (this.placeholder.parentNode) {
      this.placeholder.parentNode.insertBefore(this.draggedItem, this.placeholder);
      this.placeholder.remove();
    } else {
      container.appendChild(this.draggedItem);
    }

    // Trigger custom event
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
    this.placeholder.remove();
    this.draggedItem = null;
    this.draggedItemId = null;
    
    this.element.querySelectorAll(DRAGGABLE_CONTAINER).forEach(container => {
      container.classList.remove("active_container");
    });
  }
}
