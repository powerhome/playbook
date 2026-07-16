import {
  DRAG_HANDLE_SELECTOR,
  getContainerFromElement,
  getDragIdFromElement,
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

  test("resolvePointerDragTarget uses sibling slots when pointer stays on dragged pill", () => {
    document.body.innerHTML = `
      <div class="pb_draggable_container" data-pb-drag-container="typeahead-pills">
        <div class="pb_draggable_item" data-pb-drag-id="b"></div>
        <div class="pb_draggable_item" data-pb-drag-id="c"></div>
        <div class="pb_draggable_item" data-pb-drag-id="a"></div>
      </div>
    `;

    const rects = {
      b: { left: 0, width: 100 },
      c: { left: 100, width: 100 },
      a: { left: 200, width: 100 },
    };

    document.querySelectorAll(".pb_draggable_item").forEach((item) => {
      const id = item.getAttribute("data-pb-drag-id");
      item.getBoundingClientRect = () => ({
        left: rects[id].left,
        width: rects[id].width,
        right: rects[id].left + rects[id].width,
        top: 0,
        bottom: 20,
        height: 20,
        x: rects[id].left,
        y: 0,
        toJSON: () => ({}),
      });
    });

    const { resolvePointerDragTarget } = require("./utilities/touchDrag");

    document.elementFromPoint = () => document.querySelector('[data-pb-drag-id="a"]');
    document.elementsFromPoint = () => [document.querySelector('[data-pb-drag-id="a"]')];

    expect(resolvePointerDragTarget(250, 10, "a")).toEqual({
      targetDragId: null,
      targetContainer: "typeahead-pills",
    });

    expect(resolvePointerDragTarget(120, 10, "a")).toEqual({
      targetDragId: "c",
      targetContainer: "typeahead-pills",
    });
  });
});
