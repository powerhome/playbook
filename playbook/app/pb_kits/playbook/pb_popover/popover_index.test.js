/* eslint-env jest */
import PbPopover from "./index";

const TRIGGER_ID = "popover-trigger";
const TOOLTIP_ID = "popover-tooltip";

const flush = async () => {
  await Promise.resolve();
  jest.runOnlyPendingTimers();
  await Promise.resolve();
};

const renderPopover = ({
  closeOnClick = "outside",
  triggerId = TRIGGER_ID,
  tooltipId = TOOLTIP_ID,
} = {}) => {
  const container = document.createElement("div");
  container.innerHTML = `
    <button id="${TRIGGER_ID}">Open</button>
    <div
      data-pb-popover-kit="true"
      data-pb-popover-position="bottom"
      data-pb-popover-trigger-element-id="${triggerId}"
      data-pb-popover-tooltip-id="${tooltipId}"
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

const kitIn = (container) => container.querySelector("[data-pb-popover-kit]");
const tooltip = () => document.getElementById(TOOLTIP_ID);
const trigger = () => document.getElementById(TRIGGER_ID);
const isOpen = () => tooltip().classList.contains("show");

const clickTrigger = async () => {
  trigger().click();
  await flush();
};

const clickOutside = async () => {
  document.getElementById("outside").click();
  await flush();
};

const clickInside = async () => {
  tooltip().querySelector(".pb_popover_body").click();
  await flush();
};

const reconnect = async (container) => {
  container.remove();
  await flush();
  document.body.appendChild(container);
  await flush();
};

const recordToggleEvents = (container) => {
  const events = [];
  const record = (event) => events.push(event.type);
  container.addEventListener("pb:popover:open", record);
  container.addEventListener("pb:popover:close", record);
  return events;
};

const trackOutsideClickListeners = () => {
  const add = jest.spyOn(document.body, "addEventListener");
  const remove = jest.spyOn(document.body, "removeEventListener");
  const isOutsideClick = ([type, , capture]) => type === "click" && capture === true;

  return () => {
    const removed = remove.mock.calls.filter(isOutsideClick).map(([, handler]) => handler);
    return add.mock.calls
      .filter(isOutsideClick)
      .filter(([, handler]) => !removed.includes(handler)).length;
  };
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

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("#connect", () => {
    test("moves the tooltip to the body", async () => {
      renderPopover();
      await flush();

      expect(tooltip().parentElement).toBe(document.body);
    });

    describe("when reconnected while closed", () => {
      beforeEach(async () => {
        const container = renderPopover();
        await flush();
        await reconnect(container);
      });

      test("opens from the trigger", async () => {
        await clickTrigger();

        expect(isOpen()).toBe(true);
      });
    });

    describe("when reconnected while open", () => {
      beforeEach(async () => {
        const container = renderPopover();
        await flush();
        await clickTrigger();
        await reconnect(container);
      });

      test("stays open", () => {
        expect(isOpen()).toBe(true);
      });

      test("closes on an outside click", async () => {
        await clickOutside();

        expect(isOpen()).toBe(false);
      });
    });
  });

  describe("#disconnect", () => {
    test("reclaims the tooltip", async () => {
      const container = renderPopover();
      await flush();

      const panel = tooltip();
      container.remove();
      await flush();

      expect(panel.parentElement).toBe(kitIn(container));
    });

    test("keeps one panel after replacement", async () => {
      const container = renderPopover();
      await flush();

      container.remove();
      renderPopover();
      await flush();

      expect(document.querySelectorAll(`[id='${TOOLTIP_ID}']`)).toHaveLength(1);
    });

    test("removes the outside-close listener", async () => {
      const container = renderPopover();
      await flush();
      const listeners = trackOutsideClickListeners();
      await clickTrigger();

      container.remove();
      await flush();

      expect(listeners()).toBe(0);
    });

    describe.each([
      ["trigger", { triggerId: "missing-trigger" }],
      ["tooltip", { tooltipId: "missing-tooltip" }],
    ])("without a %s", (_name, options) => {
      test("unregisters the popover", async () => {
        jest.spyOn(console, "warn").mockImplementation(() => {});
        const container = renderPopover(options);
        await flush();
        const kit = kitIn(container);
        expect(PbPopover.elements.has(kit)).toBe(true);

        container.remove();
        await flush();

        expect(PbPopover.elements.has(kit)).toBe(false);
      });
    });
  });

  describe("outside-close listener", () => {
    let listeners;

    beforeEach(async () => {
      renderPopover();
      await flush();
      listeners = trackOutsideClickListeners();
    });

    test("is added once while open", async () => {
      await clickTrigger();

      expect(listeners()).toBe(1);
    });

    test("is removed after an outside click", async () => {
      await clickTrigger();
      await clickOutside();

      expect(listeners()).toBe(0);
    });

    test("is removed after closing from the trigger", async () => {
      await clickTrigger();
      await clickTrigger();

      expect(listeners()).toBe(0);
    });

    test("is removed after a double click on the trigger", async () => {
      trigger().click();
      trigger().click();
      await flush();

      expect(listeners()).toBe(0);
    });
  });

  describe("trigger", () => {
    beforeEach(async () => {
      renderPopover();
      await flush();
      await clickTrigger();
    });

    test("opens the popover", () => {
      expect(isOpen()).toBe(true);
    });

    test("closes the popover", async () => {
      await clickTrigger();

      expect(isOpen()).toBe(false);
    });
  });

  describe("with closeOnClick outside", () => {
    beforeEach(async () => {
      renderPopover();
      await flush();
      await clickTrigger();
    });

    test("closes on an outside click", async () => {
      await clickOutside();

      expect(isOpen()).toBe(false);
    });

    test("closes on an outside click after reopening", async () => {
      await clickOutside();
      await clickTrigger();
      await clickOutside();

      expect(isOpen()).toBe(false);
    });

    test("ignores inside clicks", async () => {
      await clickInside();

      expect(isOpen()).toBe(true);
    });
  });

  describe("with closeOnClick inside", () => {
    beforeEach(async () => {
      renderPopover({ closeOnClick: "inside" });
      await flush();
      await clickTrigger();
    });

    test("ignores outside clicks", async () => {
      await clickOutside();

      expect(isOpen()).toBe(true);
    });

    test("closes on an inside click", async () => {
      await clickInside();

      expect(isOpen()).toBe(false);
    });
  });

  describe("with closeOnClick any", () => {
    test("closes on an inside click", async () => {
      renderPopover({ closeOnClick: "any" });
      await flush();
      await clickTrigger();

      await clickInside();

      expect(isOpen()).toBe(false);
    });
  });

  describe("toggle events", () => {
    let container;
    let events;

    beforeEach(async () => {
      container = renderPopover();
      await flush();
      events = recordToggleEvents(container);
    });

    test("announces each open and close once", async () => {
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

    test("stays quiet when hiding a closed popover", async () => {
      await clickTrigger();
      await clickOutside();

      PbPopover.elements.get(kitIn(container)).hideTooltip();

      expect(events).toEqual(["pb:popover:open", "pb:popover:close"]);
    });
  });
});
