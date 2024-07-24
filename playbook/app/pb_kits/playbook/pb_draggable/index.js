import PbEnhancedElement from "../pb_enhanced_element";

const DRAGGABLE_SELECTOR = "[data-pb-draggable]";
const DRAGGABLE_CONTAINER_SELECTOR = "[data-pb-draggable-container]";
const DRAGGABLE_ITEM_SELECTOR = "[data-pb-draggable-item]";

const initialState = {
  items: [],
  dragData: { id: "", initialGroup: "" },
  isDragging: "",
  activeContainer: ""
};

export default class PbDraggable extends PbEnhancedElement {
  static get selector() {
    return DRAGGABLE_SELECTOR;
  }

  connect() {
    document.pbDraggableState = document.pbDraggableState || initialState;
    this.setItems(this.getInitialItems());
    this.bindEventListeners();
  }

  getInitialItems() {
    return JSON.parse(this.element.dataset.pbDraggable);
  }

  bindEventListeners() {
    this.bindContainerEventListener();
    this.bindItemEventListener();
  }

  bindContainerEventListener() {
    const containerElement = this.element.querySelector(DRAGGABLE_CONTAINER_SELECTOR);
    const container = containerElement.dataset.pbDraggableContainer;
    containerElement.addEventListener("dragover", (e) => this.handleDragOver(e, container));
    containerElement.addEventListener("drop", () => this.handleDrop(container));
  }

  bindItemEventListener() {
    const itemElements = this.element.querySelectorAll(DRAGGABLE_ITEM_SELECTOR);
    itemElements.forEach((itemElement) => {
      const container = itemElement.dataset.pbDraggableItemContainer;
      const dragId = itemElement.dataset.pbDraggableItemDragId;
      itemElement.addEventListener("dragstart", () => this.handleDragStart(dragId, container));
      itemElement.addEventListener("dragenter", () => this.handleDragEnter(dragId, container));
      itemElement.addEventListener("dragend", () => this.handleDragEnd());
    });
  }

  setItems(items) {
    document.pbDraggableState = { ...document.pbDraggableState, items: items };
  }

  setDragData(dragData) {
    document.pbDraggableState = { ...document.pbDraggableState, dragData: dragData };
  }

  setIsDragging(isDragging) {
    document.pbDraggableState = { ...document.pbDraggableState, isDragging: isDragging };
  }

  setActiveContainer(activeContainer) {
    document.pbDraggableState = { ...document.pbDraggableState, activeContainer: activeContainer };
  }

  changeCategory(itemId, container) {
    document.pbDraggableState = {
      ...document.pbDraggableState,
      items: document.pbDraggableState.items.map(item =>
        item.id === itemId ? { ...item, container: container } : item
      )
    };
  }

  reorderItems(dragId, targetId) {
    const newItems = [...document.pbDraggableState.items];
    const draggedItem = newItems.find(item => item.id === dragId);
    const draggedIndex = newItems.indexOf(draggedItem);
    const targetIndex = newItems.findIndex(item => item.id === targetId);

    newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, draggedItem);

    document.pbDraggableState = { ...document.pbDraggableState, items: newItems };
  }

  handleDragStart(id, container) {
    this.setDragData({ id: id, initialGroup: container });
    this.setIsDragging(id);
  }
  
  handleDragEnter(id, container) {
    if (document.pbDraggableState.dragData.id !== id) {
      this.reorderItems(document.pbDraggableState.dragData.id, id);
      this.setDragData({ id: document.pbDraggableState.dragData.id, initialGroup: container });
    }
  }
  
  handleDragEnd() {
    this.setIsDragging("");
    this.setActiveContainer("");
  }
  
  handleDrop(container) {
    this.setIsDragging("");
    this.setActiveContainer("");
    this.changeCategory(document.pbDraggableState.dragData.id, container);
  }
  
  handleDragOver(e, container) {
    e.preventDefault();
    this.setActiveContainer(container);
  }
}
