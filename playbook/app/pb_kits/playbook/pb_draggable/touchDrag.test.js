import {
  DRAG_HANDLE_SELECTOR,
  DRAGGABLE_ROOT_SELECTOR,
  getContainerFromElement,
  getDragIdFromElement,
  getDraggableRootFromElement,
} from "./utilities/touchDrag";

describe("touchDrag utilities", () => {
  test("DRAG_HANDLE_SELECTOR matches standard and card handles", () => {
    document.body.innerHTML = `
      <div class="pb_draggable_item" data-pb-drag-id="1">
        <span class="pb_draggable_handle"></span>
        <span class="card_draggable_handle"></span>
      </div>
    `;

    const item = document.querySelector(".pb_draggable_item");
    expect(item.querySelector(DRAG_HANDLE_SELECTOR)).toBeTruthy();
  });

  test("getDragIdFromElement reads data-pb-drag-id", () => {
    document.body.innerHTML = `
      <div class="pb_draggable_item" data-pb-drag-id="task-1"></div>
    `;

    expect(getDragIdFromElement(document.querySelector(".pb_draggable_item"))).toBe("task-1");
  });

  test("getContainerFromElement reads data-pb-drag-container", () => {
    document.body.innerHTML = `
      <div class="pb_draggable_container" data-pb-drag-container="To Do">
        <div class="pb_draggable_item" data-pb-drag-id="1"></div>
      </div>
    `;

    const item = document.querySelector(".pb_draggable_item");
    expect(getContainerFromElement(item)).toBe("To Do");
  });

  test("getDraggableRootFromElement finds nearest draggable root", () => {
    document.body.innerHTML = `
      <div data-pb-draggable-root>
        <div class="pb_draggable_container" data-pb-drag-container="To Do">
          <div class="pb_draggable_item" data-pb-drag-id="1"></div>
        </div>
      </div>
    `;

    const item = document.querySelector(".pb_draggable_item");
    expect(getDraggableRootFromElement(item)).toHaveAttribute("data-pb-draggable-root");
  });

  test("DRAGGABLE_ROOT_SELECTOR matches rails and react draggable roots", () => {
    document.body.innerHTML = `
      <div data-pb-draggable>
        <div class="pb_draggable">
          <div data-pb-draggable-root></div>
        </div>
      </div>
    `;

    expect(document.querySelector(DRAGGABLE_ROOT_SELECTOR)).toHaveAttribute("data-pb-draggable");
  });
});
