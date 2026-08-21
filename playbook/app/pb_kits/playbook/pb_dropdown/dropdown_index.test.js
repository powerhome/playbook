import PbDropdown from "./index";

const OPTION_SELECTOR = "[data-dropdown-option-label]";

function buildDropdownElement({
  id = "test-dropdown",
  options = [
    { id: "us", label: "United States", value: "us" },
    { id: "ca", label: "Canada", value: "ca" },
  ],
  optionsByContext = null,
  contextSelector = null,
  optionsEventType = null,
} = {}) {
  const root = document.createElement("div");
  root.setAttribute("data-pb-dropdown", "true");
  root.id = id;
  root.dataset.pbDropdownDisabled = "false";
  root.dataset.pbDropdownMultiSelect = "false";
  root.dataset.pbDropdownClearable = "true";

  if (optionsByContext) {
    root.dataset.pbDropdownOptionsByContext = JSON.stringify(optionsByContext);
  }
  if (contextSelector) {
    root.dataset.pbDropdownContextSelector = contextSelector;
  }
  if (optionsEventType) {
    root.dataset.optionsEventType = optionsEventType;
  }

  root.innerHTML = `
    <div class="dropdown_wrapper">
      <input data-dropdown-selected-option name="country" style="display: none" />
      <div class="pb_dropdown_trigger">
        <span data-dropdown-trigger-display data-dropdown-placeholder="Choose one">Choose one</span>
      </div>
      <div class="pb_dropdown_container close" data-dropdown-container="true">
        <div class="pb_list_kit"></div>
      </div>
    </div>
  `;

  const list = root.querySelector(".pb_list_kit");
  options.forEach((option) => {
    const dropdown = new PbDropdown(root);
    list.appendChild(dropdown.buildOptionElement(option));
  });

  document.body.appendChild(root);
  return root;
}

describe("PbDropdown dynamic options", () => {
  let dropdownEl;
  let instance;

  beforeEach(() => {
    document.body.innerHTML = "";
    dropdownEl = buildDropdownElement();
    instance = new PbDropdown(dropdownEl);
    instance.connect();
  });

  afterEach(() => {
    instance.disconnect();
    document.body.innerHTML = "";
  });

  test("replaceOptions updates rendered option count", () => {
    expect(dropdownEl.querySelectorAll(OPTION_SELECTOR).length).toBe(2);

    instance.replaceOptions([
      { id: "mx", label: "Mexico", value: "mx" },
      { id: "pk", label: "Pakistan", value: "pk" },
      { id: "in", label: "India", value: "in" },
    ]);

    expect(dropdownEl.querySelectorAll(OPTION_SELECTOR).length).toBe(3);
  });

  test("pb:dropdown:updateOptions replaces options for matching dropdownId", () => {
    document.dispatchEvent(
      new CustomEvent("pb:dropdown:updateOptions", {
        detail: {
          dropdownId: "test-dropdown",
          options: [{ id: "uk", label: "United Kingdom", value: "uk" }],
        },
      }),
    );

    const options = dropdownEl.querySelectorAll(OPTION_SELECTOR);
    expect(options.length).toBe(1);
    expect(JSON.parse(options[0].dataset.dropdownOptionLabel).label).toBe(
      "United Kingdom",
    );
  });

  test("pb:dropdown:updateOptions ignores events for other dropdown ids", () => {
    document.dispatchEvent(
      new CustomEvent("pb:dropdown:updateOptions", {
        detail: {
          dropdownId: "other-dropdown",
          options: [{ id: "uk", label: "United Kingdom", value: "uk" }],
        },
      }),
    );

    expect(dropdownEl.querySelectorAll(OPTION_SELECTOR).length).toBe(2);
  });

  test("options_event_type listener replaces options from custom events", () => {
    instance.disconnect();
    dropdownEl = buildDropdownElement({ optionsEventType: "cities:loaded" });
    instance = new PbDropdown(dropdownEl);
    instance.connect();

    document.dispatchEvent(
      new CustomEvent("cities:loaded", {
        detail: {
          dropdownId: "test-dropdown",
          options: [{ id: "chi", label: "Chicago", value: "chi" }],
        },
      }),
    );

    expect(dropdownEl.querySelectorAll(OPTION_SELECTOR).length).toBe(1);
  });

  test("options_by_context updates options when context select changes", () => {
    instance.disconnect();
    document.body.innerHTML = "";

    const contextSelect = document.createElement("select");
    contextSelect.id = "color_context";
    contextSelect.innerHTML = `
      <option value="red">Red</option>
      <option value="blue">Blue</option>
    `;
    document.body.appendChild(contextSelect);

    dropdownEl = buildDropdownElement({
      optionsByContext: {
        red: [{ id: "scarlet", label: "Scarlet", value: "scarlet" }],
        blue: [{ id: "navy", label: "Navy", value: "navy" }],
      },
      contextSelector: "color_context",
      options: [{ id: "scarlet", label: "Scarlet", value: "scarlet" }],
    });
    instance = new PbDropdown(dropdownEl);
    instance.connect();

    contextSelect.value = "blue";
    contextSelect.dispatchEvent(new Event("change"));

    const options = dropdownEl.querySelectorAll(OPTION_SELECTOR);
    expect(options.length).toBe(1);
    expect(JSON.parse(options[0].dataset.dropdownOptionLabel).label).toBe(
      "Navy",
    );
  });

  test("pb:dropdown:clear and pb:dropdown:select still work after option update", () => {
    document.dispatchEvent(
      new CustomEvent("pb:dropdown:updateOptions", {
        detail: {
          dropdownId: "test-dropdown",
          options: [
            { id: "us", label: "United States", value: "us" },
            { id: "ca", label: "Canada", value: "ca" },
          ],
        },
      }),
    );

    document.dispatchEvent(
      new CustomEvent("pb:dropdown:select", {
        detail: { dropdownId: "test-dropdown", optionId: "ca" },
      }),
    );

    expect(dropdownEl.querySelector("input[data-dropdown-selected-option]").value).toBe(
      "ca",
    );

    document.dispatchEvent(
      new CustomEvent("pb:dropdown:clear", {
        detail: { dropdownId: "test-dropdown" },
      }),
    );

    expect(dropdownEl.querySelector("input[data-dropdown-selected-option]").value).toBe(
      "",
    );
  });
});
