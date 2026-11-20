import PbDraggable from "./index";

describe("PbDraggable (Rails) touch drag", () => {
  let originalMatchMedia;

  const touchEvent = (type, x, y) => {
    const event = new Event(type, { bubbles: true, cancelable: true });
    const touch = { clientX: x, clientY: y };
    Object.defineProperty(event, "touches", {
      value: type === "touchend" || type === "touchcancel" ? [] : [touch],
    });
    Object.defineProperty(event, "changedTouches", { value: [touch] });
    return event;
  };

  beforeEach(() => {
    jest.useFakeTimers();
    originalMatchMedia = window.matchMedia;
    window.matchMedia = () => ({ matches: true });
    document.body.innerHTML = `
      <div data-pb-draggable="true">
        <div class="pb_draggable_container" id="list">
          <div class="pb_draggable_item" id="item-1" data-pb-drag-id="1"></div>
        </div>
      </div>
    `;
  });

  afterEach(() => {
    jest.useRealTimers();
    window.matchMedia = originalMatchMedia;
  });

  test("disconnect cancels a press in flight", () => {
    const element = document.querySelector("[data-pb-draggable]");
    const item = document.getElementById("item-1");
    const draggable = new PbDraggable(element);
    draggable.connect();

    const removeAllRanges = jest.fn();
    const getSelection = jest.spyOn(window, "getSelection").mockReturnValue({ removeAllRanges });

    item.dispatchEvent(touchEvent("touchstart", 0, 0));
    expect(item.classList.contains("is_touch_active")).toBe(true);

    draggable.disconnect();
    jest.advanceTimersByTime(500);

    expect(removeAllRanges).not.toHaveBeenCalled();
    expect(item.classList.contains("is_touch_active")).toBe(false);
    getSelection.mockRestore();
  });

  test("disconnect cancels a bind still waiting on DOMContentLoaded", () => {
    const element = document.querySelector("[data-pb-draggable]");
    const item = document.getElementById("item-1");
    const readyState = jest.spyOn(document, "readyState", "get").mockReturnValue("loading");
    const draggable = new PbDraggable(element);
    draggable.connect();
    readyState.mockRestore();

    draggable.disconnect();
    document.dispatchEvent(new Event("DOMContentLoaded"));

    item.dispatchEvent(touchEvent("touchstart", 0, 0));
    expect(item.classList.contains("is_touch_active")).toBe(false);
    expect(draggable.touchCleanups).toHaveLength(0);
  });
});
