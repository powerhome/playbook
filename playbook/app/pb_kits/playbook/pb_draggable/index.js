import PbEnhancedElement from "../pb_enhanced_element";

const DRAGGABLE_SELECTOR = "[data-pb-draggable]";
const DRAGGABLE_CONTAINER = ".pb_draggable_container";

export default class PbDraggable extends PbEnhancedElement {
  static get selector() {
    return DRAGGABLE_SELECTOR;
  }

  connect() {
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

  handleDragEnter(event) {
    if (event.target.id === this.draggedItemId) {
      event.target.classList.add("is_dragging");
    }
  }
  handleDragStart(event) {
    this.draggedItemId = event.target.id;
    event.target.classList.add("is_dragging");
  }

  handleDragOver(event) {
    event.preventDefault(); 
    event.target.classList.add("active_container");
  }

  handleDrop(event) {
    event.preventDefault();
    const target = event.target;
  
    if (!target.classList.contains("pb_draggable_container")) {
      return;
    }
  
    const draggedElement = document.getElementById(this.draggedItemId);
  
    if (draggedElement) {
      target.appendChild(draggedElement);
      draggedElement.classList.remove("is_dragging");
    }
  
    target.classList.remove("active_container");
    this.draggedItemId = null;
  }
  

  handleDragEnd(event) {
    event.target.classList.remove("is_dragging");
    this.draggedItemId = null; 
  }
}
