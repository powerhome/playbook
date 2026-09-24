import React from "react";
import {
  render,
  screen,
  fireEvent,
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
