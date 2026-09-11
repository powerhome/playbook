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

  test("options_by_context applies current context value on connect", () => {
    instance.disconnect();
    document.body.innerHTML = "";

    const contextSelect = document.createElement("select");
    contextSelect.id = "color_context_initial";
    contextSelect.innerHTML = `
      <option value="red">Red</option>
      <option value="blue" selected>Blue</option>
    `;
    document.body.appendChild(contextSelect);

    dropdownEl = buildDropdownElement({
      optionsByContext: {
        red: [{ id: "scarlet", label: "Scarlet", value: "scarlet" }],
        blue: [{ id: "navy", label: "Navy", value: "navy" }],
      },
      contextSelector: "color_context_initial",
      // Intentionally mismatched SSR options (red shades) while select is blue
      options: [{ id: "scarlet", label: "Scarlet", value: "scarlet" }],
    });
    instance = new PbDropdown(dropdownEl);
    instance.connect();

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

  test("replaceOptions with clearSelection false refreshes single-select from new payload", () => {
    instance.setSelectionByOptionId("us");
    expect(
      dropdownEl.querySelector("[data-dropdown-trigger-display]").textContent,
    ).toBe("United States");

    instance.replaceOptions(
      [
        { id: "us", label: "USA", value: "united-states" },
        { id: "ca", label: "Canada", value: "ca" },
      ],
      { clearSelection: false },
    );

    expect(dropdownEl.querySelector("input[data-dropdown-selected-option]").value).toBe(
      "us",
    );
    expect(
      dropdownEl.querySelector("[data-dropdown-trigger-display]").textContent,
    ).toBe("USA");
  });

  test("replaceOptions with clearSelection false refreshes multi-select payloads", () => {
    instance.disconnect();
    dropdownEl = buildDropdownElement({
      options: [
        { id: "us", label: "United States", value: "us" },
        { id: "ca", label: "Canada", value: "ca" },
      ],
    });
    dropdownEl.dataset.pbDropdownMultiSelect = "true";
    dropdownEl.innerHTML = `
      <div class="dropdown_wrapper">
        <input data-dropdown-selected-option name="country[]" style="display: none" />
        <div class="pb_dropdown_trigger">
          <div data-dropdown-pills-wrapper></div>
          <span data-dropdown-trigger-display-multi-select>Choose one</span>
        </div>
        <div class="pb_dropdown_container close" data-dropdown-container="true">
          <div class="pb_list_kit"></div>
        </div>
      </div>
    `;
    const list = dropdownEl.querySelector(".pb_list_kit");
    [
      { id: "us", label: "United States", value: "us" },
      { id: "ca", label: "Canada", value: "ca" },
    ].forEach((option) => {
      list.appendChild(new PbDropdown(dropdownEl).buildOptionElement(option));
    });
    instance = new PbDropdown(dropdownEl);
    instance.connect();
    instance.setSelectionByOptionIds(["us"]);

    instance.replaceOptions(
      [
        { id: "us", label: "USA", value: "united-states" },
        { id: "ca", label: "Canada", value: "ca" },
      ],
      { clearSelection: false },
    );

    const selectedPayload = Array.from(instance.selectedOptions).map(JSON.parse);
    expect(selectedPayload).toEqual([
      { id: "us", label: "USA", value: "united-states" },
    ]);
    expect(
      dropdownEl.querySelector("[data-pill-id='us'] .pb_form_pill_text").textContent,
    ).toBe("USA");
  });

  test("replaceOptions clears autocomplete filter and keyboard focus", () => {
    instance.disconnect();
    dropdownEl = buildDropdownElement();
    const trigger = dropdownEl.querySelector(".pb_dropdown_trigger");
    trigger.innerHTML = `
      <input data-dropdown-autocomplete type="text" />
      <span data-dropdown-trigger-display data-dropdown-placeholder="Choose one">Choose one</span>
    `;
    instance = new PbDropdown(dropdownEl);
    instance.connect();

    instance.searchInput.value = "can";
    instance.handleSearch("can");
    instance.keyboardHandler.focusedOptionIndex = 1;

    instance.replaceOptions([
      { id: "mx", label: "Mexico", value: "mx" },
      { id: "pk", label: "Pakistan", value: "pk" },
    ]);

    expect(instance.searchInput.value).toBe("");
    expect(instance.keyboardHandler.focusedOptionIndex).toBe(-1);
    const options = dropdownEl.querySelectorAll(OPTION_SELECTOR);
    expect(options.length).toBe(2);
    options.forEach((opt) => {
      expect(opt.style.display).toBe("");
    });
  });

  test("replaceOptions with clearSelection false restores autocomplete from new label", () => {
    instance.disconnect();
    dropdownEl = buildDropdownElement();
    const trigger = dropdownEl.querySelector(".pb_dropdown_trigger");
    trigger.innerHTML = `
      <input data-dropdown-autocomplete type="text" />
      <span data-dropdown-trigger-display data-dropdown-placeholder="Choose one">Choose one</span>
    `;
    instance = new PbDropdown(dropdownEl);
    instance.connect();
    instance.setSelectionByOptionId("us");
    instance.searchInput.value = "united";

    instance.replaceOptions(
      [
        { id: "us", label: "USA", value: "united-states" },
        { id: "ca", label: "Canada", value: "ca" },
      ],
      { clearSelection: false },
    );

    expect(instance.searchInput.value).toBe("USA");
    expect(instance.keyboardHandler.focusedOptionIndex).toBe(-1);
  });

  test("replaceOptions removes SSR empty-state No option placeholder", () => {
    instance.disconnect();
    dropdownEl = buildDropdownElement({ options: [] });
    const list = dropdownEl.querySelector(".pb_list_kit");
    list.innerHTML = `
      <div class="pb_list_item_kit display_flex justify_content_center p_xs">
        <div class="pb_body_kit">No option</div>
      </div>
    `;
    instance = new PbDropdown(dropdownEl);
    instance.connect();

    instance.replaceOptions([
      { id: "scarlet", label: "Scarlet", value: "scarlet" },
    ]);

    expect(list.textContent).not.toContain("No option");
    expect(dropdownEl.querySelectorAll(OPTION_SELECTOR).length).toBe(1);
  });
});
