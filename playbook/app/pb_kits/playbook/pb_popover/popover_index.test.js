/* eslint-env jest */
import PbPopover from "./index";

const TRIGGER_ID = "popover-trigger";
const TOOLTIP_ID = "popover-tooltip";

const flush = async () => {
  await Promise.resolve();
  jest.runOnlyPendingTimers();
  await Promise.resolve();
};

const renderPopover = (closeOnClick = "outside") => {
  const container = document.createElement("div");
  container.innerHTML = `
    <button id="${TRIGGER_ID}">Open</button>
    <div
      data-pb-popover-kit="true"
      data-pb-popover-position="bottom"
      data-pb-popover-trigger-element-id="${TRIGGER_ID}"
      data-pb-popover-tooltip-id="${TOOLTIP_ID}"
      data-pb-popover-close-on-click="${closeOnClick}"
    >
      <div class="pb_popover_tooltip hide" id="${TOOLTIP_ID}" role="tooltip">
        <div class="pb_popover_body">Content</div>
      </div>
    </div>
    <p id="outside">Elsewhere</p>
  `;
  document.body.appendChild(container);
  return container;
};

const tooltip = () => document.getElementById(TOOLTIP_ID);
const isOpen = () => tooltip().classList.contains("show");

const clickTrigger = async () => {
  document.getElementById(TRIGGER_ID).click();
  await flush();
};

const clickOutside = async () => {
  document.getElementById("outside").click();
  await flush();
};

const recordToggleEvents = () => {
  const events = [];
  const record = (event) => events.push(event.type);
  document.addEventListener("pb:popover:open", record);
  document.addEventListener("pb:popover:close", record);
  return events;
};

describe("PbPopover (Rails)", () => {
  beforeAll(() => {
    PbPopover.start();
  });

  afterAll(() => {
    PbPopover.stop();
  });

  beforeEach(async () => {
    document.body.innerHTML = "";
    await flush();
  });

  test("moves the tooltip to the body on connect", async () => {
    renderPopover();
    await flush();

    expect(tooltip().parentElement).toBe(document.body);
  });

  test("reclaims the removed tooltip", async () => {
    const container = renderPopover();
    await flush();

    const kit = container.querySelector("[data-pb-popover-kit]");
    const panel = tooltip();
    container.remove();
    await flush();

    expect(document.getElementById(TOOLTIP_ID)).toBeNull();
    expect(panel.parentElement).toBe(kit);
  });

  test("keeps one panel after replacement", async () => {
    const container = renderPopover();
    await flush();

    container.remove();
    renderPopover();
    await flush();

    expect(document.querySelectorAll(`[id='${TOOLTIP_ID}']`)).toHaveLength(1);
  });

  test("opens and closes on outside clicks", async () => {
    renderPopover();
    await flush();

    await clickTrigger();
    expect(isOpen()).toBe(true);

    await clickOutside();
    expect(isOpen()).toBe(false);
  });

  test("closes outside after reopening", async () => {
    renderPopover();
    await flush();

    await clickTrigger();
    await clickOutside();
    await clickTrigger();
    await clickOutside();

    expect(isOpen()).toBe(false);
  });

  test("closes from the trigger", async () => {
    renderPopover();
    await flush();

    await clickTrigger();
    await clickTrigger();

    expect(isOpen()).toBe(false);
  });

  test("removes the outside-close listener", async () => {
    renderPopover();
    await flush();
    await clickTrigger();
    await clickOutside();

    const kit = document.querySelector("[data-pb-popover-kit]");
    const hide = jest.spyOn(PbPopover.elements.get(kit), "hideTooltip");
    await clickOutside();
    await clickOutside();

    expect(hide).not.toHaveBeenCalled();
  });

  test("removes the trigger-close listener", async () => {
    renderPopover();
    await flush();
    await clickTrigger();
    await clickTrigger();

    const kit = document.querySelector("[data-pb-popover-kit]");
    const hide = jest.spyOn(PbPopover.elements.get(kit), "hideTooltip");
    await clickOutside();

    expect(hide).not.toHaveBeenCalled();
  });

  test("removes the disconnected listener", async () => {
    const container = renderPopover();
    await flush();
    await clickTrigger();

    const kit = container.querySelector("[data-pb-popover-kit]");
    const hide = jest.spyOn(PbPopover.elements.get(kit), "hideTooltip");
    container.remove();
    await flush();
    document.body.click();
    await flush();

    expect(hide).not.toHaveBeenCalled();
  });

  test("announces each open and close once", async () => {
    renderPopover();
    await flush();
    const events = recordToggleEvents();

    await clickTrigger();
    await clickOutside();
    await clickOutside();
    await clickTrigger();
    await clickTrigger();

    expect(events).toEqual([
      "pb:popover:open",
      "pb:popover:close",
      "pb:popover:open",
      "pb:popover:close",
    ]);
  });

  test("closes inside with any mode", async () => {
    renderPopover("any");
    await flush();

    await clickTrigger();
    tooltip().querySelector(".pb_popover_body").click();
    await flush();

    expect(isOpen()).toBe(false);
  });

  test("ignores inside clicks in outside mode", async () => {
    renderPopover();
    await flush();
    await clickTrigger();

    tooltip().querySelector(".pb_popover_body").click();
    await flush();

    expect(isOpen()).toBe(true);
  });

  test("closes only inside with inside mode", async () => {
    renderPopover("inside");
    await flush();
    await clickTrigger();

    await clickOutside();
    expect(isOpen()).toBe(true);

    tooltip().querySelector(".pb_popover_body").click();
    await flush();
    expect(isOpen()).toBe(false);
  });

  test.each([false, true])("reconnects with open=%s", async (open) => {
    const container = renderPopover();
    await flush();
    if (open) await clickTrigger();
    container.remove();
    await flush();
    document.body.appendChild(container);
    await flush();

    expect(isOpen()).toBe(open);
    if (!open) await clickTrigger();
    expect(isOpen()).toBe(true);
    await clickOutside();
    expect(isOpen()).toBe(false);
    expect(document.querySelectorAll(`[id='${TOOLTIP_ID}']`)).toHaveLength(1);
  });
});
