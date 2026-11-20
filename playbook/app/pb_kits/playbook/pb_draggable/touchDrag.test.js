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

  describe("bindTouchDrag long-press activation", () => {
    const { bindTouchDrag, TOUCH_DRAG_DELAY_MS } = require("./utilities/touchDrag");

    const touchEvent = (type, x, y) => {
      const event = new Event(type, { bubbles: true, cancelable: true });
      const touch = { clientX: x, clientY: y };
      const touches = type === "touchend" || type === "touchcancel" ? [] : [touch];
      Object.defineProperty(event, "touches", { value: touches });
      Object.defineProperty(event, "changedTouches", { value: [touch] });
      return event;
    };

    let item;
    let handlers;
    let cleanup;
    let originalMatchMedia;

    beforeEach(() => {
      jest.useFakeTimers();
      originalMatchMedia = window.matchMedia;
      window.matchMedia = () => ({ matches: true });

      document.body.innerHTML = `
        <div class="pb_draggable_container" data-pb-drag-container="list">
          <div class="pb_draggable_item" data-pb-drag-id="1"></div>
          <div class="pb_draggable_item" data-pb-drag-id="2"></div>
        </div>
      `;
      item = document.querySelector('[data-pb-drag-id="1"]');
      document.elementFromPoint = () => item;
      document.elementsFromPoint = () => [item];

      handlers = {
        onDragStart: jest.fn(),
        onDragEnter: jest.fn(),
        onDragOver: jest.fn(),
        onDrop: jest.fn(),
        onDragEnd: jest.fn(),
      };
      cleanup = bindTouchDrag({ dragId: "1", container: "list", itemElement: item, handlers });
    });

    afterEach(() => {
      cleanup();
      jest.useRealTimers();
      window.matchMedia = originalMatchMedia;
    });

    test("does not start dragging when moving immediately after touch", () => {
      item.dispatchEvent(touchEvent("touchstart", 0, 0));
      const move = touchEvent("touchmove", 0, 4);
      item.dispatchEvent(move);

      expect(handlers.onDragStart).not.toHaveBeenCalled();
      expect(move.defaultPrevented).toBe(false);
    });

    test("starts dragging after press-and-hold", () => {
      item.dispatchEvent(touchEvent("touchstart", 0, 0));
      expect(item.classList.contains("is_touch_active")).toBe(true);
      jest.advanceTimersByTime(TOUCH_DRAG_DELAY_MS);

      const move = touchEvent("touchmove", 0, 20);
      item.dispatchEvent(move);

      expect(handlers.onDragStart).toHaveBeenCalledWith("1", "list");
      expect(move.defaultPrevented).toBe(true);

      item.dispatchEvent(touchEvent("touchend", 0, 20));
      expect(handlers.onDrop).toHaveBeenCalledWith("list");
      expect(handlers.onDragEnd).toHaveBeenCalled();
      expect(item.classList.contains("is_touch_active")).toBe(false);
    });

    test("swiping beyond tolerance before the delay cancels the drag", () => {
      item.dispatchEvent(touchEvent("touchstart", 0, 0));
      item.dispatchEvent(touchEvent("touchmove", 0, 30));
      jest.advanceTimersByTime(TOUCH_DRAG_DELAY_MS);
      const move = touchEvent("touchmove", 0, 60);
      item.dispatchEvent(move);

      expect(handlers.onDragStart).not.toHaveBeenCalled();
      expect(move.defaultPrevented).toBe(false);
      expect(item.classList.contains("is_touch_active")).toBe(false);
    });

    test("releasing before the delay does not start dragging", () => {
      item.dispatchEvent(touchEvent("touchstart", 0, 0));
      jest.advanceTimersByTime(TOUCH_DRAG_DELAY_MS - 100);
      item.dispatchEvent(touchEvent("touchend", 0, 0));
      jest.advanceTimersByTime(200);

      expect(item.classList.contains("is_touch_active")).toBe(false);
      expect(handlers.onDragStart).not.toHaveBeenCalled();
      expect(handlers.onDrop).not.toHaveBeenCalled();
      expect(handlers.onDragEnd).not.toHaveBeenCalled();
    });

    test("claims small moves once armed so the browser cannot start a pan", () => {
      item.dispatchEvent(touchEvent("touchstart", 0, 0));
      jest.advanceTimersByTime(TOUCH_DRAG_DELAY_MS);

      const smallMove = touchEvent("touchmove", 0, 2);
      item.dispatchEvent(smallMove);

      expect(smallMove.defaultPrevented).toBe(true);
      expect(handlers.onDragStart).not.toHaveBeenCalled();
    });

    test("blocks the context menu for the whole press, not just once armed", () => {
      const contextMenu = () => {
        const event = new Event("contextmenu", { bubbles: true, cancelable: true });
        item.dispatchEvent(event);
        return event;
      };

      expect(contextMenu().defaultPrevented).toBe(false);

      item.dispatchEvent(touchEvent("touchstart", 0, 0));
      jest.advanceTimersByTime(TOUCH_DRAG_DELAY_MS - 1);
      expect(contextMenu().defaultPrevented).toBe(true);

      jest.advanceTimersByTime(1);
      expect(contextMenu().defaultPrevented).toBe(true);

      item.dispatchEvent(touchEvent("touchend", 0, 0));
      expect(contextMenu().defaultPrevented).toBe(false);
    });

    const nativeDragStart = (target) => {
      const event = new Event("dragstart", { bubbles: true, cancelable: true });
      target.dispatchEvent(event);
      return event;
    };

    test("blocks native dragstart only during a touch press", () => {
      const img = document.createElement("img");
      item.appendChild(img);
      const onBubbledDragStart = jest.fn();
      document.body.addEventListener("dragstart", onBubbledDragStart);

      // No touch press: native drag is left alone and still reaches delegated handlers.
      expect(nativeDragStart(img).defaultPrevented).toBe(false);
      expect(onBubbledDragStart).toHaveBeenCalledTimes(1);

      // Pending and armed press: cancelled and kept from HTML5 drag handlers.
      item.dispatchEvent(touchEvent("touchstart", 0, 0));
      expect(nativeDragStart(img).defaultPrevented).toBe(true);
      jest.advanceTimersByTime(TOUCH_DRAG_DELAY_MS);
      expect(nativeDragStart(img).defaultPrevented).toBe(true);
      expect(onBubbledDragStart).toHaveBeenCalledTimes(1);

      // After release: back to normal.
      item.dispatchEvent(touchEvent("touchend", 0, 0));
      expect(nativeDragStart(img).defaultPrevented).toBe(false);
      expect(onBubbledDragStart).toHaveBeenCalledTimes(2);

      document.body.removeEventListener("dragstart", onBubbledDragStart);
    });

    test("leaves native dragstart alone for a press outside the drag handle", () => {
      cleanup();
      item.innerHTML = '<span class="pb_draggable_handle"></span><img />';
      cleanup = bindTouchDrag({ dragId: "1", container: "list", itemElement: item, handlers });

      const img = item.querySelector("img");
      img.dispatchEvent(touchEvent("touchstart", 0, 0));

      expect(nativeDragStart(img).defaultPrevented).toBe(false);
    });

    test("a second finger cancels an armed drag without dropping", () => {
      const twoFingerStart = () => {
        const event = new Event("touchstart", { bubbles: true, cancelable: true });
        const touches = [{ clientX: 0, clientY: 20 }, { clientX: 50, clientY: 50 }];
        Object.defineProperty(event, "touches", { value: touches });
        Object.defineProperty(event, "changedTouches", { value: [touches[1]] });
        return event;
      };

      item.dispatchEvent(touchEvent("touchstart", 0, 0));
      jest.advanceTimersByTime(TOUCH_DRAG_DELAY_MS);
      item.dispatchEvent(touchEvent("touchmove", 0, 20));
      expect(handlers.onDragStart).toHaveBeenCalled();

      item.dispatchEvent(twoFingerStart());
      expect(handlers.onDragEnd).toHaveBeenCalledTimes(1);
      expect(item.classList.contains("is_touch_active")).toBe(false);

      item.dispatchEvent(touchEvent("touchend", 0, 20));
      expect(handlers.onDrop).not.toHaveBeenCalled();
      expect(handlers.onDragEnd).toHaveBeenCalledTimes(1);
    });

    test("cleanup clears is_touch_active mid-press", () => {
      item.dispatchEvent(touchEvent("touchstart", 0, 0));
      expect(item.classList.contains("is_touch_active")).toBe(true);

      cleanup();

      expect(item.classList.contains("is_touch_active")).toBe(false);
    });
  });
});
