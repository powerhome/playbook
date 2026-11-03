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

});
