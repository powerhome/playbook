/* eslint-env jest */
import PbFilter from "./index";

const CHIP_ID = "pb-interactive-filter-test-week";
const POPOVER_ID = `${CHIP_ID}-popover`;

const flush = async () => {
  await Promise.resolve();
  await new Promise((resolve) => setTimeout(resolve, 0));
};

// Mirrors the date-picker chip markup rendered by filter.html.erb.
const renderDateChip = ({ mode, selectionType }) => {
  const container = document.createElement("div");
  container.innerHTML = `
    <button type="button"
            class="pb_interactive_filter_trigger"
            id="${CHIP_ID}"
            data-pb-interactive-filter="true"
            data-pb-filter-name="Week"
            data-pb-filter-type="date-picker"
            data-pb-filter-popover-id="${POPOVER_ID}"
            data-pb-filter-value="05/06/2026"
            ${mode ? `data-pb-filter-date-mode="${mode}"` : ""}
            ${selectionType ? `data-pb-filter-date-selection-type="${selectionType}"` : ""}>
      <span data-pb-filter-value-display>05/06/2026</span>
    </button>
    <div class="pb_popover_tooltip hide" id="${POPOVER_ID}" role="tooltip">
      <div class="pb_popover_body">
        <div data-pb-filter-date-mount></div>
      </div>
    </div>
  `;
  document.body.appendChild(container);
  return container;
};

const chip = () => document.getElementById(CHIP_ID);
const editor = () => document.getElementById(POPOVER_ID);
const isOpen = () => editor().classList.contains("show");
const clickDay = (label) =>
  editor().querySelector(`.flatpickr-day[aria-label="${label}"]`).click();

describe("PbFilter interactive date-picker chips (Rails)", () => {
  let container;

  beforeAll(() => {
    PbFilter.start();
  });

  afterAll(() => {
    PbFilter.stop();
  });

  afterEach(async () => {
    container?.remove();
    editor()?.remove();
    await flush();
  });

  test.each(["range", "multiple"])(
    "week chip with mode %s emits one date and closes, since weekSelect forces single mode",
    async (mode) => {
      container = renderDateChip({ mode, selectionType: "week" });
      await flush();

      chip().click();
      expect(isOpen()).toBe(true);

      clickDay("May 13, 2026");

      expect(chip().dataset.pbFilterValue).toBe("05/13/2026");
      expect(isOpen()).toBe(false);
    }
  );

  test("range chip without a selection type stays open after the first date", async () => {
    container = renderDateChip({ mode: "range" });
    await flush();

    chip().click();
    clickDay("May 13, 2026");

    expect(isOpen()).toBe(true);
  });
});
