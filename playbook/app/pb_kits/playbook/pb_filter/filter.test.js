import React from "react";
import {
  render,
  screen,
  fireEvent,
} from "../utilities/test-utils";
import { Button, Filter, Flex, Select, TextInput } from "..";

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
  render(<FilterTest data={{ testid: "render-test" }}/>);

  const btn = screen.getAllByRole("button")[0];

  // checks if the sort menu rendered
  expect(screen.getByLabelText("sort-amount-down icon")).toBeInTheDocument()
  expect(screen.getByText('Popularity')).toBeInTheDocument() // check if filter/sort is rendered 

  // hits the filter button and triggers popover
  fireEvent.click(btn);

  // check if popover displays correctly by checking its tet
  expect(screen.getByText("Example Text Field")).toBeInTheDocument() 


});
