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

test("limits interactive filters to four at desktop sizes", () => {
  mockMatchMedia(true);

  render(
    <FilterTest
        filters={{
          One: "1",
          Two: "2",
          Three: "3",
          Four: "4",
          Five: "5",
        }}
        interactiveFilters={{
          One: { type: "select", options: [{ value: "1" }], onChange: jest.fn() },
          Two: { type: "select", options: [{ value: "2" }], onChange: jest.fn() },
          Three: { type: "select", options: [{ value: "3" }], onChange: jest.fn() },
          Four: { type: "select", options: [{ value: "4" }], onChange: jest.fn() },
          Five: { type: "select", options: [{ value: "5" }], onChange: jest.fn() },
        }}
    />
  );

  const interactiveButtons = screen
    .getAllByRole("button")
    .filter((button) => button.getAttribute("aria-haspopup") === "dialog");

  expect(interactiveButtons).toHaveLength(4);
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

test("renders interactive filters as static labels below 960px", () => {
  mockMatchMedia(false);

  render(
    <FilterTest
        filters={{
          Territory: "USA",
          Status: "open",
        }}
        interactiveFilters={{
          Territory: {
            type: "select",
            options: [{ value: "USA" }],
            onChange: jest.fn(),
          },
          Status: {
            type: "dropdown",
            options: [{ value: "open", label: "Open" }],
            onChange: jest.fn(),
          },
        }}
    />
  );

  const interactiveButtons = screen
    .getAllByRole("button")
    .filter((button) => button.getAttribute("aria-haspopup") === "dialog");

  expect(interactiveButtons).toHaveLength(0);
  expect(screen.getByText("Open")).toBeInTheDocument();
});
