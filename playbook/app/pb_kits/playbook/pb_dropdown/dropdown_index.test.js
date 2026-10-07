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

describe("PbDropdown async search", () => {
  let root;
  let instance;
  let input;
  let search;

  const type = (term) => {
    input.value = term;
    input.dispatchEvent(new Event("input", { bubbles: true }));
  };

  beforeEach(() => {
    jest.useFakeTimers();
    root = buildDropdownElement({ options: [] });
    root.dataset.pbDropdownAsync = "true";
    input = document.createElement("input");
    input.setAttribute("data-dropdown-autocomplete", "");
    root.querySelector(".pb_dropdown_trigger").appendChild(input);
    search = jest.fn();
    root.addEventListener("pb:dropdown:search", search);
    instance = new PbDropdown(root);
    instance.connect();
  });

  afterEach(() => {
    instance.disconnect();
    jest.clearAllTimers();
    jest.useRealTimers();
    document.body.innerHTML = "";
  });

  test.each([true, false])("option updates retain async results when clearSelection is %p", (clearSelection) => {
    type("old");
    jest.advanceTimersByTime(250);
    const pending = search.mock.calls[0][0].detail;
    document.dispatchEvent(new CustomEvent("pb:dropdown:updateOptions", {
      detail: { dropdownId: root.id, options: [{ id: "new", label: "New option" }], clearSelection },
    }));
    pending.setResults([{ id: "stale", label: "Stale option" }]);
    pending.setError();
    jest.advanceTimersByTime(15000);
    expect(instance.queryAllOptions()).toHaveLength(1);
    expect(instance.queryAllOptions()[0]).toHaveTextContent("New option");
    expect(instance.baseInput.value).toBe("");
    expect(root).toHaveAttribute("aria-busy", "false");
    expect(instance.target.querySelector("[data-dropdown-async-status]")).toBeNull();
  });

  test("async multi-select reconciliation preserves replacement options", () => {
    instance.disconnect();
    root.dataset.pbDropdownMultiSelect = "true";
    instance.connect();
    instance.replaceOptions([{ id: "new", label: "New option" }], { clearSelection: false });
    expect(instance.queryAllOptions()).toHaveLength(1);
    expect(instance.queryAllOptions()[0]).toHaveTextContent("New option");
    expect(instance.selectedOptions.size).toBe(0);
  });

  test("requires three characters and debounces typing for 250ms", () => {
    type("ab");
    jest.advanceTimersByTime(250);
    expect(search).not.toHaveBeenCalled();
    expect(instance.target).not.toHaveClass("open");
    type("abc");
    jest.advanceTimersByTime(200);
    type("abcd");
    jest.advanceTimersByTime(249);
    expect(search).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(search).toHaveBeenCalledTimes(1);
    expect(search.mock.calls[0][0].detail.searchingFor).toBe("abcd");
    expect(instance.target).toHaveClass("open");
    expect(root).toHaveAttribute("aria-busy", "true");
  });

  test("honors configured thresholds and supports the search bar", () => {
    instance.disconnect();
    input.removeAttribute("data-dropdown-autocomplete");
    input.setAttribute("data-dropdown-search", "");
    root.dataset.pbDropdownSearchTermMinimumLength = "1";
    root.dataset.pbDropdownSearchDebounceTimeout = "50";
    instance.connect();
    type("a");
    jest.advanceTimersByTime(50);
    expect(search).toHaveBeenCalledTimes(1);
  });

  test("renders remote results without local filtering or clearing the query", () => {
    type("abc");
    jest.advanceTimersByTime(250);
    search.mock.calls[0][0].detail.setResults([{ id: "1", label: "Different label" }]);
    expect(input.value).toBe("abc");
    expect(instance.queryAllOptions()).toHaveLength(1);
    expect(instance.queryAllOptions()[0]).toHaveTextContent("Different label");
    expect(instance.queryAllOptions()[0].style.display).toBe("");
    expect(root).toHaveAttribute("aria-busy", "false");
    expect(instance.target.querySelector("[data-dropdown-async-status]")).toBeNull();
  });

  test("invalidates old callbacks immediately, before the next debounce finishes", () => {
    type("abc");
    jest.advanceTimersByTime(250);
    const first = search.mock.calls[0][0].detail;
    type("abcd");
    first.setResults([{ id: "old", label: "Old" }]);
    expect(instance.queryAllOptions()).toHaveLength(0);
    jest.advanceTimersByTime(250);
    const latest = search.mock.calls[1][0].detail;
    latest.setResults([{ id: "new", label: "New" }]);
    first.setError();
    expect(instance.queryAllOptions()[0]).toHaveTextContent("New");
    latest.setResults([]);
    expect(instance.queryAllOptions()).toHaveLength(1);
  });

  test("empty results and failed requests end loading with distinct messages", () => {
    type("abc");
    jest.advanceTimersByTime(250);
    search.mock.calls[0][0].detail.setResults([]);
    expect(instance.target.querySelector(".dropdown_no_options")).not.toBeNull();
    expect(root).toHaveAttribute("aria-busy", "false");
    type("def");
    jest.advanceTimersByTime(250);
    search.mock.calls[1][0].detail.setError();
    expect(instance.target).toHaveTextContent("Unable to load options");
    expect(instance.target.querySelector("[data-dropdown-async-status]")).toHaveClass("pb_item_kit", "display_flex", "justify_content_center");
    expect(instance.target.querySelector(".dropdown_no_options")).toBeNull();
    expect(root).toHaveAttribute("aria-busy", "false");
  });

  test("no_options_text replaces the empty results message", () => {
    instance.disconnect();
    root.dataset.pbDropdownNoOptionsText = "No agents available";
    instance.connect();
    type("abc");
    jest.advanceTimersByTime(250);
    search.mock.calls[0][0].detail.setResults([]);
    expect(instance.target.querySelector(".dropdown_no_options")).toHaveTextContent("No agents available");
  });

  test("unfinished requests time out", () => {
    type("abc");
    jest.advanceTimersByTime(15250);
    expect(root).toHaveAttribute("aria-busy", "false");
    expect(instance.target).toHaveTextContent("Unable to load options");
  });

  test.each(["short query", "clear", "disconnect"])("%s invalidates pending results", (action) => {
    type("abc");
    jest.advanceTimersByTime(250);
    const request = search.mock.calls[0][0].detail;
    if (action === "short query") type("a");
    if (action === "clear") instance.clearSelection();
    if (action === "disconnect") instance.disconnect();
    request.setResults([{ id: "late", label: "Late" }]);
    expect(instance.queryAllOptions()).toHaveLength(0);
    expect(root).toHaveAttribute("aria-busy", "false");
  });

  test("events bubble from the kit root and results use the cached portaled container", () => {
    const listener = jest.fn();
    document.addEventListener("pb:dropdown:search", listener);
    const container = instance.target;
    document.body.appendChild(container);
    type("abc");
    jest.advanceTimersByTime(250);
    expect(listener.mock.calls[0][0].target).toBe(root);
    listener.mock.calls[0][0].detail.setResults([{ id: "1", label: "Result" }]);
    expect(container.querySelector(OPTION_SELECTOR)).toHaveTextContent("Result");
    document.removeEventListener("pb:dropdown:search", listener);
  });

  test("loaded options support keyboard selection and form submission", () => {
    type("can");
    jest.advanceTimersByTime(250);
    search.mock.calls[0][0].detail.setResults([{ id: "ca", label: "Canada", value: "ca" }]);
    const selected = jest.fn();
    root.addEventListener("pb:dropdown:selected", selected);
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    expect(instance.baseInput.value).toBe("ca");
    expect(input.value).toBe("Canada");
    expect(selected.mock.calls[0][0].detail).toEqual({ id: "ca", label: "Canada", value: "ca" });
  });

  test("rich results clone template content and keep markup separate from option data", () => {
    const template = document.createElement("template");
    template.innerHTML = '<div data-user-id="42"><strong>Ada</strong></div><span>Engineering</span>';
    const option = { id: "42", label: "Ada", value: "42", department: "Engineering" };
    type("ada");
    jest.advanceTimersByTime(250);
    search.mock.calls[0][0].detail.setResults([
      { option, content: template.content },
      { id: "plain", label: "Plain option" },
    ]);

    const rows = instance.queryAllOptions();
    expect(rows).toHaveLength(2);
    expect(rows[0].querySelector("[data-user-id]")).toHaveAttribute("data-user-id", "42");
    expect(rows[0].querySelector("span")).toHaveTextContent("Engineering");
    expect(JSON.parse(rows[0].dataset.dropdownOptionLabel)).toEqual(option);
    expect(rows[1]).toHaveTextContent("Plain option");
    expect(template.content.childNodes).toHaveLength(2);
    expect(rows[0].querySelector("strong")).not.toBe(template.content.querySelector("strong"));

    const selected = jest.fn();
    root.addEventListener("pb:dropdown:selected", selected);
    rows[0].querySelector("strong").click();
    expect(instance.baseInput.value).toBe("42");
    expect(input.value).toBe("Ada");
    expect(selected.mock.calls[0][0].detail).toEqual(option);
  });

  test("rich Element content works after portaling and disabled rows cannot be selected", () => {
    const content = document.createElement("span");
    content.textContent = "Rich user row";
    const container = instance.target;
    document.body.appendChild(container);
    type("user");
    jest.advanceTimersByTime(250);
    search.mock.calls[0][0].detail.setResults([
      { option: { id: "disabled", label: "Disabled", disabled: true }, content },
      { option: { id: "enabled", label: "Enabled" }, content },
    ]);

    const rows = instance.queryAllOptions();
    rows[0].querySelector("span").click();
    expect(instance.baseInput.value).toBe("");
    expect(rows[0]).toHaveAttribute("aria-disabled", "true");
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    expect(instance.baseInput.value).toBe("enabled");
    expect(input.value).toBe("Enabled");
    expect(content.textContent).toBe("Rich user row");
  });

  test("stale rich results do not replace the current results or consume template content", () => {
    const content = document.createDocumentFragment();
    content.appendChild(document.createElement("span"));
    type("old");
    jest.advanceTimersByTime(250);
    const oldRequest = search.mock.calls[0][0].detail;
    type("new");
    jest.advanceTimersByTime(250);
    search.mock.calls[1][0].detail.setResults([{ id: "new", label: "New" }]);
    oldRequest.setResults([{ option: { id: "old", label: "Old" }, content }]);
    expect(instance.queryAllOptions()).toHaveLength(1);
    expect(instance.queryAllOptions()[0]).toHaveTextContent("New");
    expect(content.childNodes).toHaveLength(1);
  });

  test("plain result labels are rendered as text", () => {
    type("label");
    jest.advanceTimersByTime(250);
    search.mock.calls[0][0].detail.setResults([{ id: "1", label: "<strong>Label</strong>" }]);
    expect(instance.queryAllOptions()[0]).toHaveTextContent("<strong>Label</strong>");
    expect(instance.queryAllOptions()[0].querySelector("strong")).toBeNull();
  });

  test.each([42, 0, 'user\'"[42]'])("selection preserves full data for id %p", (id) => {
    const option = {
      id, label: "Ada", value: "employee", department_id: 7,
      address: { city: "Austin", unit: null }, roles: ["admin", "user"], active: false,
    };
    type("ada");
    jest.advanceTimersByTime(250);
    search.mock.calls[0][0].detail.setResults([option]);
    const selected = jest.fn();
    root.addEventListener("pb:dropdown:selected", selected);
    instance.queryAllOptions()[0].click();
    expect(selected).toHaveBeenCalledTimes(1);
    expect(selected.mock.calls[0][0].detail).toEqual(option);
    expect(instance.baseInput.value).toBe(String(id));
    expect(JSON.parse(root.dataset.optionSelected)).toEqual(option);

    // Event consumers must not mutate the kit's retained selection.
    selected.mock.calls[0][0].detail.address.city = "Changed";
    type("another");
    jest.advanceTimersByTime(250);
    search.mock.calls[1][0].detail.setResults([]);
    instance.emitSelectionChange();
    expect(selected.mock.calls[selected.mock.calls.length - 1][0].detail).toEqual(option);
    instance.clearSelection();
    expect(selected.mock.calls[selected.mock.calls.length - 1][0].detail).toBeNull();
  });

  test("external selection accepts a string id for a numeric option without changing its payload", () => {
    const option = { id: 42, label: "Ada", value: 42, department_id: 7 };
    type("ada");
    jest.advanceTimersByTime(250);
    search.mock.calls[0][0].detail.setResults([option]);
    const selected = jest.fn();
    root.addEventListener("pb:dropdown:selected", selected);
    document.dispatchEvent(new CustomEvent("pb:dropdown:select", {
      detail: { dropdownId: root.id, optionId: "42" },
    }));
    expect(input.value).toBe("Ada");
    expect(selected.mock.calls[0][0].detail).toEqual(option);
  });

  test.each([false, true])("async defaults retain their payload without rendered options (multi: %p)", (multi) => {
    instance.disconnect();
    const option = { id: 42, label: "Existing user", value: 42, department_id: 7 };
    root.dataset.pbDropdownMultiSelect = String(multi);
    root.dataset.pbDropdownDefaultValue = JSON.stringify(multi ? [option] : option);
    root.querySelector("[data-dropdown-selected-option]").dataset.defaultValue = "42";
    instance = new PbDropdown(root);
    instance.connect();
    const selected = jest.fn();
    root.addEventListener("pb:dropdown:selected", selected);
    instance.emitSelectionChange();
    expect(instance.queryAllOptions()).toHaveLength(0);
    expect(selected.mock.calls[0][0].detail).toEqual(multi ? [option] : option);
    if (multi) {
      expect(root.querySelector("input[data-generated]").value).toBe("42");
    } else {
      expect(input.value).toBe("Existing user");
      expect(instance.baseInput.value).toBe("42");
    }
  });

  test("multi-select retains complete selections across searches and matches repeated results by id", () => {
    instance.disconnect();
    root.dataset.pbDropdownMultiSelect = "true";
    const pills = document.createElement("div");
    pills.setAttribute("data-dropdown-pills-wrapper", "");
    root.appendChild(pills);
    instance = new PbDropdown(root);
    instance.connect();
    const first = { id: 0, label: "Ada", value: "not-the-id", department_id: 7 };
    const second = { id: 43, label: "Grace", value: 43, address: { city: "Boston" } };
    const selected = jest.fn();
    root.addEventListener("pb:dropdown:selected", selected);
    type("ada");
    jest.advanceTimersByTime(250);
    search.mock.calls[0][0].detail.setResults([first]);
    instance.queryAllOptions()[0].click();
    expect(root.querySelector("input[data-generated]").value).toBe("0");

    type("grace");
    jest.advanceTimersByTime(250);
    search.mock.calls[1][0].detail.setResults([{ ...first, label: "Ada updated" }, second]);
    expect(instance.queryAllOptions()[0].style.display).toBe("none");
    instance.queryAllOptions()[1].click();
    expect(selected.mock.calls[selected.mock.calls.length - 1][0].detail).toEqual([first, second]);
    expect(pills.querySelectorAll("[data-pill-id]")).toHaveLength(2);
    expect(instance.queryAllOptions()).toHaveLength(0);

    pills.querySelector(".pb_form_pill_close").click();
    expect(selected.mock.calls[selected.mock.calls.length - 1][0].detail).toEqual([second]);
    expect(instance.queryAllOptions()).toHaveLength(0);
  });

  test("input events are immediate, including below the search threshold", () => {
    const changed = jest.fn();
    root.addEventListener("pb:dropdown:input", changed);
    type("a");
    expect(changed).toHaveBeenCalledTimes(1);
    expect(changed.mock.calls[0][0].detail).toEqual({ value: "a", reason: "input" });
    expect(changed.mock.calls[0][0].target).toBe(root);
    expect(search).not.toHaveBeenCalled();
    type("");
    expect(changed.mock.calls[1][0].detail).toEqual({ value: "", reason: "input" });
  });

  test("clearing typed text invalidates a single selection regardless of edit method", () => {
    type("ada");
    jest.advanceTimersByTime(250);
    search.mock.calls[0][0].detail.setResults([{ id: "42", label: "Ada" }]);
    instance.queryAllOptions()[0].click();
    const selected = jest.fn();
    root.addEventListener("pb:dropdown:selected", selected);
    type("");
    expect(instance.baseInput.value).toBe("");
    expect(selected).toHaveBeenCalledTimes(1);
    expect(selected.mock.calls[0][0].detail).toBeNull();
    expect(instance.queryAllOptions()).toHaveLength(0);
    expect(instance.target).toHaveClass("close");
  });

  test("query-only clear button and public clear remove results and notify consumers", () => {
    instance.disconnect();
    const clear = document.createElement("button");
    clear.setAttribute("data-dropdown-clear-icon", "");
    root.appendChild(clear);
    instance.connect();
    const changed = jest.fn();
    root.addEventListener("pb:dropdown:input", changed);
    type("ada");
    expect(clear.style.display).toBe("");
    jest.advanceTimersByTime(250);
    const pending = search.mock.calls[0][0].detail;
    clear.click();
    pending.setResults([{ id: "late", label: "Late" }]);
    expect(input.value).toBe("");
    expect(clear.style.display).toBe("none");
    expect(instance.queryAllOptions()).toHaveLength(0);
    expect(changed.mock.calls[changed.mock.calls.length - 1][0].detail).toEqual({ value: "", reason: "clear" });

    type("new");
    jest.advanceTimersByTime(250);
    search.mock.calls[1][0].detail.setResults([{ id: "new", label: "New" }]);
    document.dispatchEvent(new CustomEvent("pb:dropdown:clear", { detail: { dropdownId: root.id } }));
    expect(instance.queryAllOptions()).toHaveLength(0);
    expect(instance.target).toHaveClass("close");
    expect(root).toHaveAttribute("aria-busy", "false");
  });

  test("portaled search bar edits and clear events are scoped to the kit root", () => {
    instance.disconnect();
    input.removeAttribute("data-dropdown-autocomplete");
    input.setAttribute("data-dropdown-search", "");
    instance.target.prepend(input);
    instance.connect();
    document.body.appendChild(instance.target);
    const changed = jest.fn();
    root.addEventListener("pb:dropdown:input", changed);
    type("ada");
    expect(changed.mock.calls[0][0].target).toBe(root);
    instance.clearSelection();
    expect(input.value).toBe("");
    expect(changed.mock.calls[1][0].detail).toEqual({ value: "", reason: "clear" });
  });

  test("native form reset clears results and callbacks, while canceled reset leaves state intact", async () => {
    instance.disconnect();
    const form = document.createElement("form");
    document.body.appendChild(form);
    form.appendChild(root);
    instance.connect();
    const changed = jest.fn();
    root.addEventListener("pb:dropdown:input", changed);
    type("ada");
    jest.advanceTimersByTime(250);
    const pending = search.mock.calls[0][0].detail;
    const preventReset = (event) => event.preventDefault();
    form.addEventListener("reset", preventReset);
    form.reset();
    await Promise.resolve();
    expect(input.value).toBe("ada");
    expect(root).toHaveAttribute("aria-busy", "true");
    form.removeEventListener("reset", preventReset);
    form.reset();
    await Promise.resolve();
    pending.setResults([{ id: "late", label: "Late" }]);
    expect(input.value).toBe("");
    expect(instance.queryAllOptions()).toHaveLength(0);
    expect(root).toHaveAttribute("aria-busy", "false");
    expect(changed.mock.calls[changed.mock.calls.length - 1][0].detail).toEqual({ value: "", reason: "reset" });
  });

  test("reconnecting does not duplicate form reset listeners and disconnect cancels queued resets", async () => {
    instance.disconnect();
    const form = document.createElement("form");
    document.body.appendChild(form);
    form.appendChild(root);
    instance.connect();
    instance.disconnect();
    instance.connect();
    const changed = jest.fn();
    root.addEventListener("pb:dropdown:input", changed);
    form.reset();
    await Promise.resolve();
    expect(changed).toHaveBeenCalledTimes(1);
    form.reset();
    instance.disconnect();
    await Promise.resolve();
    expect(changed).toHaveBeenCalledTimes(1);
  });

  test("editing a multi-select query does not clear selected pills", () => {
    instance.disconnect();
    root.dataset.pbDropdownMultiSelect = "true";
    instance.connect();
    type("ada");
    jest.advanceTimersByTime(250);
    search.mock.calls[0][0].detail.setResults([{ id: "42", label: "Ada" }]);
    instance.queryAllOptions()[0].click();
    type("new");
    type("");
    expect(Array.from(instance.selectedOptions).map(JSON.parse)).toEqual([{ id: "42", label: "Ada", value: "42" }]);
    expect(root.querySelector("input[data-generated]").value).toBe("42");
  });

  test("clear followed by immediate retyping accepts only the latest response", () => {
    root.dataset.pbDropdownSearchDebounceTimeout = "0";
    type("old");
    jest.advanceTimersByTime(0);
    const previous = search.mock.calls[0][0].detail;
    instance.clearSelection();
    type("new");
    jest.advanceTimersByTime(0);
    previous.setResults([{ id: "old", label: "Old" }]);
    search.mock.calls[1][0].detail.setResults([{ id: "new", label: "New" }]);
    expect(instance.target).toHaveClass("open");
    expect(instance.queryAllOptions()).toHaveLength(1);
    expect(instance.queryAllOptions()[0]).toHaveTextContent("New");
  });

  test("clearing the search bar preserves the selection", () => {
    instance.disconnect();
    input.removeAttribute("data-dropdown-autocomplete");
    input.setAttribute("data-dropdown-search", "");
    instance.connect();
    type("ada");
    jest.advanceTimersByTime(250);
    search.mock.calls[0][0].detail.setResults([{ id: "42", label: "Ada" }]);
    instance.queryAllOptions()[0].click();
    type("");
    expect(instance.baseInput.value).toBe("42");
  });

  test("clearable false still hides the clear control while typing", () => {
    instance.disconnect();
    root.dataset.pbDropdownClearable = "false";
    const clear = document.createElement("button");
    clear.setAttribute("data-dropdown-clear-icon", "");
    root.appendChild(clear);
    instance.connect();
    type("ada");
    expect(clear.style.display).toBe("none");
  });

  test("a selection handler can publicly clear an async picker without keyboard selection reopening it", () => {
    root.addEventListener("pb:dropdown:selected", ({ detail }) => {
      if (detail) {
        document.dispatchEvent(new CustomEvent("pb:dropdown:clear", { detail: { dropdownId: root.id } }));
      }
    });
    type("ada");
    jest.advanceTimersByTime(250);
    search.mock.calls[0][0].detail.setResults([{ id: "42", label: "Ada" }]);
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true }));
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    expect(input.value).toBe("");
    expect(instance.baseInput.value).toBe("");
    expect(instance.queryAllOptions()).toHaveLength(0);
    expect(instance.target).toHaveClass("close");
  });

  test.each(["click", "ArrowDown", "Enter"])("%s opens an empty async menu with the empty message", (action) => {
    const down = document.createElement("span");
    down.setAttribute("data-dropdown-open-icon", "");
    const up = document.createElement("span");
    up.setAttribute("data-dropdown-close-icon", "");
    root.append(down, up);
    type("ada");
    jest.advanceTimersByTime(250);
    search.mock.calls[0][0].detail.setResults([{ id: "42", label: "Ada" }]);
    instance.queryAllOptions()[0].click();
    instance.clearSelection();
    jest.advanceTimersByTime(0);
    if (action === "click") input.click();
    else input.dispatchEvent(new KeyboardEvent("keydown", { key: action, bubbles: true }));
    expect(instance.target).toHaveClass("open");
    expect(instance.target.querySelector(".dropdown_no_options")).toHaveTextContent("No results found");
    expect(down.style.display).toBe("none");
    expect(up.style.display).not.toBe("none");
    type("new");
    jest.advanceTimersByTime(250);
    expect(instance.target).toHaveClass("open");
    expect(instance.target).toHaveTextContent("Loading");
    expect(instance.target.querySelector(".dropdown_no_options")).toBeNull();
  });

  test("a query after a space keeps earlier results whose labels match", () => {
    type("Emily");
    jest.advanceTimersByTime(250);
    search.mock.calls[0][0].detail.setResults([
      { id: "1", label: "Emily Smith" },
      { id: "2", label: "Emily Jones" },
    ]);
    type("Emily S");
    jest.advanceTimersByTime(250);
    search.mock.calls[1][0].detail.setResults([]);
    const labels = () => Array.from(instance.queryAllOptions()).map((opt) => opt.textContent);
    expect(labels()).toEqual(["Emily Smith"]);
    expect(instance.target.querySelector(".dropdown_no_options")).toBeNull();

    type("Emily Z");
    jest.advanceTimersByTime(250);
    search.mock.calls[2][0].detail.setResults([]);
    expect(instance.queryAllOptions()).toHaveLength(0);
    expect(instance.target.querySelector(".dropdown_no_options")).toHaveTextContent("No results found");
  });

  test("active_style classes are applied to async results", () => {
    instance.disconnect();
    root.dataset.pbDropdownActiveStyle = JSON.stringify({
      background_color: "bg_light",
      font_color: "text_lt_default",
    });
    instance.connect();
    type("ada");
    jest.advanceTimersByTime(250);
    search.mock.calls[0][0].detail.setResults([{ id: "1", label: "Ada Lovelace" }]);
    const option = instance.queryAllOptions()[0];
    expect(option).toHaveClass("bg-bg_light", "font-text_lt_default");
  });

  test("reopening a multi-select after a pick shows the empty message", () => {
    instance.disconnect();
    root.dataset.pbDropdownMultiSelect = "true";
    const pills = document.createElement("div");
    pills.setAttribute("data-dropdown-pills-wrapper", "");
    root.appendChild(pills);
    instance = new PbDropdown(root);
    instance.connect();

    type("Emily");
    jest.advanceTimersByTime(250);
    search.mock.calls[0][0].detail.setResults([
      { id: "1", label: "Emily Smith" },
      { id: "2", label: "Emily Jones" },
    ]);
    instance.queryAllOptions()[0].click();
    jest.advanceTimersByTime(0);
    expect(instance.queryAllOptions()).toHaveLength(0);
    input.click();
    expect(instance.target).toHaveClass("open");
    expect(instance.target.querySelector(".dropdown_no_options")).toHaveTextContent("No results found");
  });

  test("removing the last multi-select pill drops the earlier search results", () => {
    instance.disconnect();
    root.dataset.pbDropdownMultiSelect = "true";
    const pills = document.createElement("div");
    pills.setAttribute("data-dropdown-pills-wrapper", "");
    root.appendChild(pills);
    instance = new PbDropdown(root);
    instance.connect();

    type("Emily");
    jest.advanceTimersByTime(250);
    search.mock.calls[0][0].detail.setResults([
      { id: "1", label: "Emily Smith" },
      { id: "2", label: "Emily Jones" },
    ]);
    instance.queryAllOptions()[0].click();
    jest.advanceTimersByTime(0);
    type("Michael");
    jest.advanceTimersByTime(250);
    search.mock.calls[1][0].detail.setResults([{ id: "3", label: "Michael Scott" }]);
    expect(instance.queryAllOptions()).toHaveLength(1);
    input.value = "";

    pills.querySelector(".pb_form_pill_close").click();
    expect(instance.queryAllOptions()).toHaveLength(0);

    input.click();
    expect(instance.target).toHaveClass("open");
    expect(instance.target.querySelector(".dropdown_no_options")).toHaveTextContent("No results found");
  });

  test("reopening after a selection shows only the option matching the input", () => {
    type("ada");
    jest.advanceTimersByTime(250);
    search.mock.calls[0][0].detail.setResults([
      { id: "1", label: "Ada Lovelace" },
      { id: "2", label: "Adam Smith" },
    ]);
    instance.queryAllOptions()[0].click();
    jest.advanceTimersByTime(0);
    expect(input.value).toBe("Ada Lovelace");
    expect(instance.target).toHaveClass("close");
    input.click();
    const visible = () => Array.from(instance.queryAllOptions()).filter((opt) => opt.style.display !== "none");
    expect(instance.target).toHaveClass("open");
    expect(visible()).toHaveLength(1);
    expect(visible()[0]).toHaveTextContent("Ada Lovelace");
    expect(instance.target.querySelector(".dropdown_no_options")).toBeNull();
    expect(search).toHaveBeenCalledTimes(1);

    instance.target.style.height = "400px";
    Object.defineProperty(instance.target, "scrollHeight", {
      configurable: true,
      get() {
        return this.style.height === "auto" ? 48 : parseFloat(this.style.height) || 0;
      },
    });
    instance.hideElement(instance.target);
    jest.advanceTimersByTime(0);
    input.click();
    expect(instance.target.style.height).toBe("48px");
  });

  test("clicking an empty async dropdown shows the empty message until a search starts", () => {
    input.click();
    expect(instance.target).toHaveClass("open");
    expect(instance.target.querySelector(".dropdown_no_options")).toHaveTextContent("No results found");

    type("abc");
    expect(instance.target).toHaveClass("open");
    expect(instance.target.querySelector(".dropdown_no_options")).toHaveTextContent("No results found");
    jest.advanceTimersByTime(250);
    expect(instance.target).toHaveTextContent("Loading");
    expect(instance.target.querySelector(".dropdown_no_options")).toBeNull();
    search.mock.calls[0][0].detail.setResults([{ id: "1", label: "Result" }]);
    expect(instance.queryAllOptions()[0]).toHaveTextContent("Result");
    expect(instance.target.querySelector(".dropdown_no_options")).toBeNull();
  });

  test("no_options_text is the empty message shown before an async search", () => {
    instance.disconnect();
    root.dataset.pbDropdownNoOptionsText = "No agents available";
    instance.connect();
    input.click();
    expect(instance.target.querySelector(".dropdown_no_options")).toHaveTextContent("No agents available");
  });

  test("an empty async search-bar menu can still open so the user can type", () => {
    instance.disconnect();
    input.removeAttribute("data-dropdown-autocomplete");
    input.setAttribute("data-dropdown-search", "");
    instance.target.prepend(input);
    instance.connect();
    instance.clearSelection();
    root.querySelector(".pb_dropdown_trigger").click();
    expect(instance.target).toHaveClass("open");
    expect(instance.target.querySelector(".dropdown_no_options")).toHaveTextContent("No results found");
  });

  test.each(["empty", "error"])("async %s status can be reopened", (status) => {
    type("ada");
    jest.advanceTimersByTime(250);
    const request = search.mock.calls[0][0].detail;
    if (status === "empty") request.setResults([]);
    else request.setError();
    instance.hideElement(instance.target);
    jest.advanceTimersByTime(0);
    input.click();
    expect(instance.target).toHaveClass("open");
    expect(instance.target).toHaveTextContent(status === "empty" ? "No results found" : "Unable to load options");
  });

  test.each(["Escape", "Tab", "outside click"])("%s cancels debounce even before the menu opens", (action) => {
    type("ada");
    if (action === "outside click") document.body.click();
    else input.dispatchEvent(new KeyboardEvent("keydown", { key: action, bubbles: true }));
    jest.advanceTimersByTime(250);
    expect(search).not.toHaveBeenCalled();
    expect(instance.target).not.toHaveClass("open");
    expect(root).toHaveAttribute("aria-busy", "false");

    type("new");
    jest.advanceTimersByTime(250);
    expect(search).toHaveBeenCalledTimes(1);
    expect(instance.target).toHaveClass("open");
  });

  test.each(["Escape", "Tab", "outside click"])("%s during debounce keeps loaded results and reopening retries the query", (action) => {
    type("ada");
    jest.advanceTimersByTime(250);
    search.mock.calls[0][0].detail.setResults([{ id: "42", label: "Ada" }]);
    type("adal");
    expect(instance.queryAllOptions()).toHaveLength(1);
    expect(instance.queryAllOptions()[0]).toHaveTextContent("Ada");
    if (action === "outside click") document.body.click();
    else input.dispatchEvent(new KeyboardEvent("keydown", { key: action, bubbles: true }));
    jest.advanceTimersByTime(0);
    expect(search).toHaveBeenCalledTimes(1);
    expect(instance.target).toHaveClass("close");
    expect(instance.queryAllOptions()[0]).toHaveTextContent("Ada");

    input.click();
    expect(instance.target).toHaveClass("open");
    expect(instance.queryAllOptions()[0]).toHaveTextContent("Ada");
    jest.advanceTimersByTime(250);
    expect(search).toHaveBeenCalledTimes(2);
    expect(search.mock.calls[1][0].detail.searchingFor).toBe("adal");
    expect(instance.target).toHaveTextContent("Loading");
  });

  test.each(["Escape", "Tab", "outside click"])("%s during an in-flight search restores loaded results and reopening retries", (action) => {
    type("ada");
    jest.advanceTimersByTime(250);
    search.mock.calls[0][0].detail.setResults([{ id: "42", label: "Ada" }]);
    type("adal");
    jest.advanceTimersByTime(250);
    const pending = search.mock.calls[1][0].detail;
    expect(instance.queryAllOptions()).toHaveLength(0);
    if (action === "outside click") document.body.click();
    else input.dispatchEvent(new KeyboardEvent("keydown", { key: action, bubbles: true }));
    pending.setResults([{ id: "late", label: "Late" }]);
    jest.advanceTimersByTime(0);
    expect(instance.target).toHaveClass("close");
    expect(instance.queryAllOptions()).toHaveLength(1);
    expect(instance.queryAllOptions()[0]).toHaveTextContent("Ada");
    expect(instance.target).not.toHaveTextContent("Late");

    input.click();
    jest.advanceTimersByTime(250);
    expect(search).toHaveBeenCalledTimes(3);
    expect(search.mock.calls[2][0].detail.searchingFor).toBe("adal");
    expect(instance.target).toHaveClass("open");
    expect(instance.target).toHaveTextContent("Loading");
  });

  test("reopening after a dismissed debounce retries a nonempty autocomplete query", () => {
    type("ada");
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    jest.advanceTimersByTime(250);
    expect(search).not.toHaveBeenCalled();
    expect(instance.target).not.toHaveClass("open");

    input.click();
    jest.advanceTimersByTime(250);
    expect(search).toHaveBeenCalledTimes(1);
    expect(search.mock.calls[0][0].detail.searchingFor).toBe("ada");
    expect(instance.target).toHaveClass("open");
    expect(instance.target).toHaveTextContent("Loading");
  });

  test.each(["Escape", "Tab", "outside click"])("%s invalidates in-flight callbacks and their timeout", (action) => {
    type("ada");
    jest.advanceTimersByTime(250);
    const pending = search.mock.calls[0][0].detail;
    if (action === "outside click") document.body.click();
    else input.dispatchEvent(new KeyboardEvent("keydown", { key: action, bubbles: true }));
    pending.setResults([{ id: "late", label: "Late" }]);
    pending.setError();
    jest.advanceTimersByTime(15000);
    expect(instance.queryAllOptions()).toHaveLength(0);
    expect(instance.target).not.toHaveClass("open");
    expect(instance.target.querySelector("[data-dropdown-async-status]")).toBeNull();
    expect(root).toHaveAttribute("aria-busy", "false");
  });

  test("clicking another Dropdown search bar dismisses a pending search", () => {
    const otherInput = document.createElement("input");
    otherInput.setAttribute("data-dropdown-search", "");
    document.body.appendChild(otherInput);
    type("ada");
    otherInput.click();
    jest.advanceTimersByTime(250);
    expect(search).not.toHaveBeenCalled();
    expect(instance.target).not.toHaveClass("open");
  });

  test.each([false, true])("search-bar typing stays open below the minimum (portaled: %p)", (portaled) => {
    instance.disconnect();
    input.removeAttribute("data-dropdown-autocomplete");
    input.setAttribute("data-dropdown-search", "");
    instance.target.prepend(input);
    instance.connect();
    instance.showElement(instance.target);
    if (portaled) document.body.appendChild(instance.target);
    input.focus();

    for (const term of ["a", "ad"]) {
      type(term);
      jest.advanceTimersByTime(250);
      expect(instance.target).toHaveClass("open");
      expect(instance.target).not.toHaveClass("close");
      expect(document.activeElement).toBe(input);
      expect(search).not.toHaveBeenCalled();
    }
    type("ada");
    jest.advanceTimersByTime(250);
    expect(search).toHaveBeenCalledTimes(1);
    expect(search.mock.calls[0][0].detail.searchingFor).toBe("ada");
  });

  test.each([false, true])("deleting a search-bar query clears results but retains the input (portaled: %p)", (portaled) => {
    instance.disconnect();
    input.removeAttribute("data-dropdown-autocomplete");
    input.setAttribute("data-dropdown-search", "");
    instance.target.prepend(input);
    instance.connect();
    instance.showElement(instance.target);
    if (portaled) document.body.appendChild(instance.target);
    input.focus();
    type("ada");
    jest.advanceTimersByTime(250);
    search.mock.calls[0][0].detail.setResults([{ id: "42", label: "Ada" }]);
    type("ad");
    expect(instance.queryAllOptions()).toHaveLength(0);
    expect(instance.target).toHaveClass("open");
    expect(document.activeElement).toBe(input);

    type("adam");
    jest.advanceTimersByTime(250);
    const pending = search.mock.calls[1][0].detail;
    type("");
    pending.setResults([{ id: "late", label: "Late" }]);
    pending.setError();
    jest.advanceTimersByTime(15000);
    expect(instance.queryAllOptions()).toHaveLength(0);
    expect(instance.target).toHaveClass("open");
    expect(document.activeElement).toBe(input);
    expect(root).toHaveAttribute("aria-busy", "false");
    expect(instance.target.querySelector("[data-dropdown-async-status]")).toBeNull();
    expect(search).toHaveBeenCalledTimes(2);
  });

  test("disabled dropdowns do not search", () => {
    instance.isDisabled = true;
    type("abc");
    jest.advanceTimersByTime(250);
    expect(search).not.toHaveBeenCalled();
  });
});


describe("PbDropdown synchronous compatibility", () => {
  let root;
  let instance;
  let input;

  beforeEach(() => {
    root = buildDropdownElement();
    input = document.createElement("input");
    input.setAttribute("data-dropdown-autocomplete", "");
    root.querySelector(".pb_dropdown_trigger").appendChild(input);
    const form = document.createElement("form");
    document.body.appendChild(form);
    form.appendChild(root);
    instance = new PbDropdown(root);
    instance.connect();
  });

  afterEach(() => {
    instance.disconnect();
    document.body.innerHTML = "";
  });

  test("local filtering is immediate and emits no async events", () => {
    const changed = jest.fn();
    root.addEventListener("pb:dropdown:input", changed);
    root.addEventListener("pb:dropdown:search", changed);
    input.value = "can";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    expect(instance.queryAllOptions()[0].style.display).toBe("none");
    expect(instance.queryAllOptions()[1].style.display).toBe("");
    expect(changed).not.toHaveBeenCalled();
    expect(root).not.toHaveAttribute("aria-busy");
  });

  test("selection retains legacy notification timing and payload, and clear keeps static options", () => {
    const selected = jest.fn(() => {
      expect(instance.target).not.toHaveClass("close");
    });
    instance.target.classList.remove("close");
    instance.target.classList.add("open");
    root.addEventListener("pb:dropdown:selected", selected);
    instance.queryAllOptions()[0].click();
    // The legacy composite trigger emits once per display (text and autocomplete).
    expect(selected).toHaveBeenCalledTimes(2);
    expect(selected.mock.calls[0][0].detail).toEqual({ id: "us", label: "United States", value: "us" });
    root.removeEventListener("pb:dropdown:selected", selected);
    const changed = jest.fn();
    root.addEventListener("pb:dropdown:input", changed);
    instance.clearSelection();
    expect(instance.queryAllOptions()).toHaveLength(2);
    expect(changed).not.toHaveBeenCalled();
    expect(root).not.toHaveAttribute("aria-busy");
  });

  test("Quick Pick still updates and clears its date fields", () => {
    root.dataset.pbDropdownVariant = "quickpick";
    root.dataset.startDateId = "compat-start";
    root.dataset.endDateId = "compat-end";
    const start = document.createElement("input");
    start.id = "compat-start";
    const end = document.createElement("input");
    end.id = "compat-end";
    root.append(start, end);
    const option = {
      id: "today", label: "Today", value: "today",
      formatted_start_date: "09/29/2026", formatted_end_date: "09/29/2026",
    };
    instance.replaceOptions([option]);
    instance.queryAllOptions()[0].click();
    expect(start.value).toBe("09/29/2026");
    expect(end.value).toBe("09/29/2026");
    expect(JSON.parse(root.dataset.optionSelected)).toEqual(option);
    instance.clearSelection();
    expect(start.value).toBe("");
    expect(end.value).toBe("");
    expect(instance.queryAllOptions()).toHaveLength(1);
  });

  test("native reset still clears synchronously without selection or input notifications", () => {
    instance.setSelectionByOptionId("ca");
    const changed = jest.fn();
    root.addEventListener("pb:dropdown:input", changed);
    root.addEventListener("pb:dropdown:selected", changed);
    root.closest("form").reset();
    expect(instance.baseInput.value).toBe("");
    expect(instance.queryAllOptions()).toHaveLength(2);
    expect(changed).not.toHaveBeenCalled();
  });
});

describe("PbDropdown multi-select identity", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const mount = (options, { asyncSearch = false } = {}) => {
    const root = document.createElement("div");
    root.setAttribute("data-pb-dropdown", "true");
    root.id = "multi-identity";
    root.dataset.pbDropdownDisabled = "false";
    root.dataset.pbDropdownMultiSelect = "true";
    root.dataset.pbDropdownClearable = "true";
    if (asyncSearch) root.dataset.pbDropdownAsync = "true";
    root.innerHTML = `
      <div class="dropdown_wrapper">
        <input data-dropdown-selected-option name="country[]" style="display: none" />
        <div class="pb_dropdown_trigger">
          <input data-dropdown-autocomplete type="text" />
          <div data-dropdown-pills-wrapper></div>
        </div>
        <div class="pb_dropdown_container close" data-dropdown-container="true">
          <div class="pb_list_kit"></div>
        </div>
      </div>
    `;
    const list = root.querySelector(".pb_list_kit");
    options.forEach((option) => {
      const el = document.createElement("div");
      el.className = "pb_dropdown_option_list";
      el.dataset.dropdownOptionLabel = JSON.stringify(option);
      el.innerHTML = `<div class="pb_body_kit_light">${option.label}</div>`;
      list.appendChild(el);
    });
    document.body.appendChild(root);
    const instance = new PbDropdown(root);
    instance.connect();
    return { root, instance };
  };

  test("value-only options stay distinct when clicked, filtered, and removed", () => {
    const { root, instance } = mount([
      { label: "Canada", value: "ca" },
      { label: "Mexico", value: "mx" },
    ]);
    const rows = () => instance.queryAllOptions();
    rows()[0].click();
    expect(rows()[0].style.display).toBe("none");
    expect(rows()[1].style.display).toBe("");
    rows()[1].click();
    expect(Array.from(instance.selectedOptions).map(JSON.parse)).toEqual([
      { label: "Canada", value: "ca" },
      { label: "Mexico", value: "mx" },
    ]);
    expect(rows()[0].style.display).toBe("none");
    expect(rows()[1].style.display).toBe("none");
    expect(Array.from(root.querySelectorAll("input[data-generated]")).map((input) => input.value).sort()).toEqual(["ca", "mx"]);

    root.querySelector(".pb_form_pill_close").click();
    expect(Array.from(instance.selectedOptions).map(JSON.parse)).toEqual([{ label: "Mexico", value: "mx" }]);
    expect(rows()[0].style.display).toBe("");
    expect(rows()[1].style.display).toBe("none");
    instance.disconnect();
  });

  test("options with neither id nor value match the full payload", () => {
    const { instance } = mount([
      { label: "Red" },
      { label: "Blue" },
    ]);
    const rows = () => instance.queryAllOptions();
    rows()[0].click();
    rows()[1].click();
    expect(instance.selectedOptions.size).toBe(2);
    expect(rows()[0].style.display).toBe("none");
    expect(rows()[1].style.display).toBe("none");
    rows()[0].click();
    expect(Array.from(instance.selectedOptions).map(JSON.parse)).toEqual([{ label: "Blue" }]);
    expect(rows()[0].style.display).toBe("");
    expect(rows()[1].style.display).toBe("none");
    instance.disconnect();
  });

  test("async results hide only the selected value-only option", () => {
    jest.useFakeTimers();
    const { root, instance } = mount([
      { label: "Canada", value: "ca" },
      { label: "Mexico", value: "mx" },
    ], { asyncSearch: true });
    const search = jest.fn();
    root.addEventListener("pb:dropdown:search", search);
    instance.queryAllOptions()[0].click();
    const input = root.querySelector("[data-dropdown-autocomplete]");
    input.value = "mex";
    input.dispatchEvent(new Event("input", { bubbles: true }));
    jest.advanceTimersByTime(250);
    search.mock.calls[0][0].detail.setResults([
      { label: "Canada", value: "ca" },
      { label: "Mexico", value: "mx" },
    ]);
    const rows = instance.queryAllOptions();
    expect(rows[0].style.display).toBe("none");
    expect(rows[1].style.display).toBe("");
    expect(JSON.parse(rows[0].dataset.dropdownOptionLabel).id).toBe("ca");
    instance.disconnect();
    jest.useRealTimers();
  });
});
