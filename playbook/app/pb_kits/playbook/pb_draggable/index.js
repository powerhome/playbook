import PbEnhancedElement from "../pb_enhanced_element";

const DRAGGABLE_SELECTOR = "[data-pb-draggable]";

export default class PbDragabble extends PbEnhancedElement {
  static get selector() {
    return DRAGGABLE_SELECTOR;
  }

  connect() {
    this.bindEventListeners();
  }

  bindEventListeners() {
    // Event listeners for all draggable items and containers
    this.element.querySelectorAll(".draggable-item").forEach(item => {
      item.addEventListener("dragstart", this.handleDragStart.bind(this));
      item.addEventListener("dragend", this.handleDragEnd.bind(this));
    });

    this.element.querySelectorAll(".draggable-container").forEach(container => {
      container.addEventListener("dragover", this.handleDragOver.bind(this));
      container.addEventListener("drop", this.handleDrop.bind(this));
    });
  }

  handleDragStart(event) {
    this.draggedItemId = event.target.id;
    event.target.classList.add("is-dragging");
  }

  handleDragOver(event) {
    event.preventDefault(); 
    event.target.classList.add("active-container");
  }

  handleDrop(event) {
    event.preventDefault();
    const target = event.target;
    const draggedElement = document.getElementById(this.draggedItemId);

    if (target && draggedElement && target !== draggedElement) {
      target.appendChild(draggedElement);
      draggedElement.classList.remove("is-dragging");
    }

    target.classList.remove("active-container");
    this.draggedItemId = null; 
  }

  handleDragEnd(event) {
    event.target.classList.remove("is-dragging");
    this.draggedItemId = null; 
  }
}
