import React, { useState } from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "../utilities/test-utils";
import { Button, Filter, Flex, Select, TextInput } from "playbook-ui";

const mockMatchMedia = (matches) => {
  window.matchMedia = jest.fn().mockImplementation(() => ({
    addEventListener: jest.fn(),
    addListener: jest.fn(),
    dispatchEvent: jest.fn(),
    matches,
    media: "",
    onchange: null,
    removeEventListener: jest.fn(),
    removeListener: jest.fn(),
  }));
};

function FilterTest(props) {
  const SortingChangeCallback = (sortOptions) => {
    alert(JSON.stringify(sortOptions[0]));
  };

  const options = [
    { value: "USA" },
    { value: "Canada" },
    { value: "Brazil" },
    { value: "Philippines" },
    { value: "A Galaxy Far Far Away Like Really Far Away" },
  ];
  return (
    <Filter
        onSortChange={SortingChangeCallback}
        results={1}
        sortOptions={{
        popularity: "Popularity",
        // eslint-disable-next-line
        manager_title: "Manager's Title",
        // eslint-disable-next-line
        manager_name: "Manager's Name",
      }}
        sortValue={[{ name: "popularity", dir: "desc" }]}
        {...props}
    >
      <TextInput
          label="Example Text Field"
          placeholder="Enter Text"
          {...props}
      />

      <Select
          blankSelection="Select One..."
          label="Example Collection Select"
          name="Collection Select"
          options={options}
          {...props}
      />
      <Flex spacing="between"
          {...props}>
        <Button text="Apply"
            {...props} />
        <Button text="Clear"
            variant="secondary"
            {...props} />
      </Flex>
    </Filter>
  );
}

test("triggers popover on filter button click", () => {
  const { container } = render(<FilterTest data={{ testid: "render-test" }}/>);

  const btn = screen.getAllByRole("button")[0];

  // checks if the sort menu rendered
  expect(container.querySelector('.pb_custom_icon')).toBeInTheDocument()
  expect(screen.getByText('Popularity')).toBeInTheDocument() // check if filter/sort is rendered 

  // hits the filter button and triggers popover
  fireEvent.click(btn);

  // check if popover displays correctly by checking its tet
  expect(screen.getByText("Example Text Field")).toBeInTheDocument() 


});


test("calls onChange and closes editor when an interactive option is selected", () => {
  mockMatchMedia(true);
  const handleChange = jest.fn();

  render(
    <FilterTest
        filters={{
          Status: "open",
        }}
        interactiveFilters={{
          Status: {
            type: "dropdown",
            options: [
              { value: "open", label: "Open" },
              { value: "closed", label: "Closed" },
            ],
            onChange: handleChange,
          },
        }}
    />
  );

  const interactiveButton = screen
    .getAllByRole("button")
    .find((button) => button.getAttribute("aria-haspopup") === "dialog");

  fireEvent.click(interactiveButton);
  fireEvent.click(screen.getByRole("option", { name: "Closed" }));

  expect(handleChange).toHaveBeenCalledWith("closed");
  expect(screen.queryByRole("option", { name: "Closed" })).not.toBeInTheDocument();
});

test("generates quickpick options for interactive dropdown filters", () => {
  mockMatchMedia(true);
  const handleChange = jest.fn();

  render(
    <FilterTest
        filters={{
          "Date range": "quickpick-this-week",
        }}
        interactiveFilters={{
          "Date range": {
            type: "dropdown",
            variant: "quickpick",
            onChange: handleChange,
          },
        }}
    />
  );

  expect(screen.getByText("This Week")).toBeInTheDocument();

  const interactiveButton = screen
    .getAllByRole("button")
    .find((button) => button.getAttribute("aria-haspopup") === "dialog");

  fireEvent.click(interactiveButton);
  fireEvent.click(screen.getByRole("option", { name: "Last Month" }));

  expect(handleChange).toHaveBeenCalledWith("quickpick-last-month");
});

test("renders a month picker for interactive date-picker filters with selectionType month", async () => {
  mockMatchMedia(true);
  const handleChange = jest.fn();

  render(
    <FilterTest
        filters={{
          "Report month": "May 2026",
        }}
        interactiveFilters={{
          "Report month": {
            type: "date-picker",
            selectionType: "month",
            value: "May 2026",
            minDate: "03/01/2026",
            maxDate: "10/31/2026",
            onChange: handleChange,
          },
        }}
    />
  );

  const interactiveButton = screen
    .getAllByRole("button")
    .find((button) => button.getAttribute("aria-haspopup") === "dialog");

  fireEvent.click(interactiveButton);

  const months = document.querySelectorAll(".flatpickr-monthSelect-month");
  expect(months).toHaveLength(12);

  // minDate/maxDate use the default m/d/Y format, not the month plugin's F Y
  const disabled = Array.from(months)
    .filter((el) => el.classList.contains("flatpickr-disabled"))
    .map((el) => el.textContent);
  expect(disabled).toEqual(["Jan", "Feb", "Nov", "Dec"]);

  fireEvent.click(Array.from(months).find((el) => el.textContent === "Jun"));

  await waitFor(() => expect(handleChange).toHaveBeenCalledWith("June 2026"));
});

test("month picker refreshes disabled months when the year is typed instead of using the arrows", () => {
  mockMatchMedia(true);

  render(
    <FilterTest
        filters={{ "Report month": "December 2025" }}
        interactiveFilters={{
          "Report month": {
            type: "date-picker",
            selectionType: "month",
            value: "December 2025",
            minDate: "12/01/2025",
            maxDate: "11/30/2026",
            onChange: jest.fn(),
          },
        }}
    />
  );

  fireEvent.click(
    screen.getAllByRole("button").find((button) => button.getAttribute("aria-haspopup") === "dialog")
  );

  const disabledMonths = () =>
    Array.from(document.querySelectorAll(".flatpickr-monthSelect-month.flatpickr-disabled"))
      .map((el) => el.textContent);
  expect(disabledMonths()).toHaveLength(11);

  const yearInput = document.querySelector(".numInputWrapper input.cur-year");
  yearInput.value = "2026";
  fireEvent.keyUp(yearInput, { key: "Enter" });

  expect(disabledMonths()).toEqual(["Dec"]);
  expect(document.querySelector(".flatpickr-prev-month")).not.toHaveClass("flatpickr-disabled");
  expect(document.querySelector(".flatpickr-next-month")).toHaveClass("flatpickr-disabled");
});

test("month chip updates without errors when the parent stores the value", async () => {
  mockMatchMedia(true);

  const MonthFilter = () => {
    const [month, setMonth] = useState("May 2026");
    return (
      <FilterTest
          filters={{ Month: month }}
          interactiveFilters={{
            Month: {
              type: "date-picker",
              selectionType: "month",
              value: month,
              onChange: setMonth,
            },
          }}
      />
    );
  };

  const errors = [];
  const onError = (event) => {
    errors.push(event.message);
    event.preventDefault();
  };
  window.addEventListener("error", onError);

  render(<MonthFilter />);

  const interactiveButton = screen
    .getAllByRole("button")
    .find((button) => button.getAttribute("aria-haspopup") === "dialog");

  fireEvent.click(interactiveButton);

  // A raw click (not wrapped in act) matches the browser, where React 17 re-renders synchronously.
  Array.from(document.querySelectorAll(".flatpickr-monthSelect-month"))
    .find((el) => el.textContent === "Jun")
    .dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));

  await waitFor(() => expect(interactiveButton).toHaveTextContent("June 2026"));
  window.removeEventListener("error", onError);
  expect(errors).toEqual([]);
});

test.each([
  ["day", undefined],
  ["week", "week"],
])("%s chip calls onChange synchronously without errors", (_label, selectionType) => {
  mockMatchMedia(true);
  const handleChange = jest.fn();

  const DayFilter = () => {
    const [date, setDate] = useState("05/01/2026");
    return (
      <FilterTest
          filters={{ Date: date }}
          interactiveFilters={{
            Date: {
              type: "date-picker",
              selectionType,
              value: date,
              onChange: (value) => {
                handleChange(value);
                setDate(value);
              },
            },
          }}
      />
    );
  };

  const errors = [];
  const onError = (event) => {
    errors.push(event.message);
    event.preventDefault();
  };
  window.addEventListener("error", onError);

  // The raw click below skips act() on purpose, so React warns about it.
  const consoleError = console.error;
  const errorSpy = jest.spyOn(console, "error").mockImplementation((message, ...args) => {
    if (String(message).includes("not wrapped in act")) return;
    consoleError(message, ...args);
  });

  render(<DayFilter />);

  const interactiveButton = screen
    .getAllByRole("button")
    .find((button) => button.getAttribute("aria-haspopup") === "dialog");

  fireEvent.click(interactiveButton);

  // Raw click so React 17 re-renders synchronously, as in the browser.
  document
    .querySelector('.flatpickr-day[aria-label="May 13, 2026"]')
    .dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));

  window.removeEventListener("error", onError);
  errorSpy.mockRestore();
  expect(handleChange).toHaveBeenCalledWith("05/13/2026");
  expect(interactiveButton).toHaveTextContent("05/13/2026");
  expect(errors).toEqual([]);
});

test("renders a week picker for interactive date-picker filters with selectionType week", () => {
  mockMatchMedia(true);

  render(
    <FilterTest
        filters={{
          Week: "05/06/2026",
        }}
        interactiveFilters={{
          Week: {
            type: "date-picker",
            selectionType: "week",
            value: "05/06/2026",
            onChange: jest.fn(),
          },
        }}
    />
  );

  const interactiveButton = screen
    .getAllByRole("button")
    .find((button) => button.getAttribute("aria-haspopup") === "dialog");

  fireEvent.click(interactiveButton);

  const day = document.querySelector('.flatpickr-day[aria-label="May 13, 2026"]');
  fireEvent.mouseOver(day);

  // weekSelect highlights the full week around the hovered day
  expect(document.querySelectorAll(".flatpickr-day.inRange").length).toBeGreaterThan(0);
});

test.each(["range", "multiple"])(
  "week chip with mode %s emits one date and closes, since weekSelect forces single mode",
  (mode) => {
    mockMatchMedia(true);
    const handleChange = jest.fn();

    render(
      <FilterTest
          filters={{
            Week: "05/06/2026",
          }}
          interactiveFilters={{
            Week: {
              type: "date-picker",
              selectionType: "week",
              mode,
              value: "05/06/2026",
              onChange: handleChange,
            },
          }}
      />
    );

    const interactiveButton = screen
      .getAllByRole("button")
      .find((button) => button.getAttribute("aria-haspopup") === "dialog");

    fireEvent.click(interactiveButton);
    fireEvent.click(document.querySelector('.flatpickr-day[aria-label="May 13, 2026"]'));

    expect(handleChange).toHaveBeenCalledWith("05/13/2026");
    expect(document.querySelector(".flatpickr-calendar")).not.toBeInTheDocument();
  }
);

test("applies htmlOptions to the root element", () => {
  render(
    <Filter
        htmlOptions={{ title: "filter title" }}
        results={1}
    />
  );

  expect(document.querySelector(".pb_filter_kit")).toHaveAttribute(
    "title",
    "filter title"
  );
});

test("renders double layout when double is true", () => {
  render(<FilterTest double />);

  expect(screen.getByText("sort by:")).toBeInTheDocument();
});

test("responsive stacked renders a stable CSS layout shell", () => {
  const { container, rerender } = render(<FilterTest responsive="stacked" />);

  const layout = container.querySelector(".pb_filter_responsive_layout");
  expect(layout).toBeInTheDocument();
  expect(container.querySelector(".pb_filter_kit.pb_filter_responsive")).toBeInTheDocument();
  expect(screen.getByText("sort by:")).toBeInTheDocument();
  expect(screen.getByText("Popularity")).toBeInTheDocument();

  // Resize must not remount into Single/Double — shell stays mounted.
  mockMatchMedia(true);
  rerender(<FilterTest responsive="stacked" />);
  expect(container.querySelector(".pb_filter_responsive_layout")).toBe(layout);

  mockMatchMedia(false);
  rerender(<FilterTest responsive="stacked" />);
  expect(container.querySelector(".pb_filter_responsive_layout")).toBe(layout);
});

test("responsive stacked ignores explicit double", () => {
  const { container } = render(
    <FilterTest
        double
        responsive="stacked"
    />
  );

  expect(container.querySelector(".pb_filter_responsive_layout")).toBeInTheDocument();
  expect(container.querySelector(".pb_filter_responsive_bottom.filter-bottom")).toBeInTheDocument();
});

test("responsive stacked merges kit className with caller className", () => {
  const { container } = render(
    <FilterTest
        className="consumer-class"
        responsive="stacked"
    />
  );

  expect(container.querySelector(".pb_filter_kit.pb_filter_responsive.consumer-class")).toBeInTheDocument();
});

test("toggles a single sort option without opening the popover", () => {
  const handleSortChange = jest.fn();

  const { rerender } = render(
    <Filter
        onSortChange={handleSortChange}
        results={1}
        sortOptions={{ popularity: "Popularity" }}
        sortValue={[{ name: "popularity", dir: "desc" }]}
    />
  );

  fireEvent.click(screen.getByRole("button", { name: /Popularity/ }));

  expect(handleSortChange).toHaveBeenCalledWith([{ name: "popularity", dir: "asc" }]);
  expect(document.querySelector(".pb_filter_sort_menu")).not.toBeInTheDocument();

  rerender(
    <Filter
        onSortChange={handleSortChange}
        results={1}
        sortOptions={{ popularity: "Popularity" }}
        sortValue={[{ name: "popularity", dir: "asc" }]}
    />
  );

  fireEvent.click(screen.getByRole("button", { name: /Popularity/ }));

  expect(handleSortChange).toHaveBeenLastCalledWith([{ name: "popularity", dir: "desc" }]);
  expect(document.querySelector(".pb_filter_sort_menu")).not.toBeInTheDocument();
});

test("opens the sort popover when multiple options are available", () => {
  render(<FilterTest />);

  fireEvent.click(screen.getByRole("button", { name: /Popularity/ }));

  expect(screen.getByText("Manager's Title")).toBeInTheDocument();
  expect(document.querySelector(".pb_filter_sort_menu")).toBeInTheDocument();
});

test("responsive stacked without children keeps sort-only FilterSingle", () => {
  const { container } = render(
    <Filter
        responsive="stacked"
        results={1}
        sortOptions={{ popularity: "Popularity" }}
        sortValue={[{ name: "popularity", dir: "desc" }]}
    />
  );

  expect(container.querySelector(".pb_filter_responsive_layout")).not.toBeInTheDocument();
  expect(container.querySelector(".pb_filter_responsive")).not.toBeInTheDocument();
  expect(screen.queryByText("No Filter Selected")).not.toBeInTheDocument();
  expect(screen.getByText("Popularity")).toBeInTheDocument();
});
