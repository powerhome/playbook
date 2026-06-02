import React, { useState } from "react";

import Filter from "../_filter";

import Button from "../../pb_button/_button";
import DatePicker from "../../pb_date_picker/_date_picker";
import Dropdown from "../../pb_dropdown/_dropdown";
import Flex from "../../pb_flex/_flex";
import Select from "../../pb_select/_select";

const territorySelectOptions = [
  { value: "USA" },
  { value: "Canada" },
  { value: "Brazil" },
  { value: "Philippines" },
];

const statusDropdownOptions = [
  { id: "open", label: "Open", value: "open" },
  { id: "in_progress", label: "In progress", value: "in_progress" },
  { id: "resolved", label: "Resolved", value: "resolved" },
  { id: "closed", label: "Closed", value: "closed" },
];

const INITIAL_FILTERS = {
  territory: "USA",
  status: "open",
  dateRange: "quickpick-this-week",
  startDate: "05/01/2026",
};

const statusOptionForValue = (value) =>
  value
    ? statusDropdownOptions.find((opt) => opt.value === value)
    : undefined;

const FilterInteractive = (props) => {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const updateFilter = (key) => (value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const handleClear = () => {
    setFilters(INITIAL_FILTERS);
  };

  return (
    <Filter
        {...props}
        filters={{
          Territory: filters.territory,
          Status: filters.status,
          "Date range": filters.dateRange,
          "Start date": filters.startDate,
        }}
        interactiveFilters={{
          Territory: {
            type: "select",
            options: territorySelectOptions,
            value: filters.territory,
            onChange: updateFilter("territory"),
          },
          Status: {
            type: "dropdown",
            options: statusDropdownOptions,
            value: filters.status,
            onChange: updateFilter("status"),
          },
          "Date range": {
            type: "dropdown",
            variant: "quickpick",
            value: filters.dateRange,
            onChange: updateFilter("dateRange"),
          },
          "Start date": {
            type: "date-picker",
            value: filters.startDate,
            onChange: updateFilter("startDate"),
            format: "m/d/Y",
          },
        }}
        minWidth="360px"
        results={546}
        sortOptions={{
          popularity: "Popularity",
        }}
        sortValue={[{ name: "popularity", dir: "desc" }]}
    >
      {({ closePopover }) => (
        <form>
          <Select
              {...props}
              label="Territory"
              name="location"
              onChange={(e) => updateFilter("territory")(e.target.value)}
              options={territorySelectOptions}
              value={filters.territory}
          />
          <Dropdown
              {...props}
              blankSelection="Select status..."
              defaultValue={statusOptionForValue(filters.status)}
              key={filters.status || "cleared"}
              label="Status"
              marginBottom="sm"
              onSelect={(option) =>
                updateFilter("status")(option ? option.value : "")
              }
              options={statusDropdownOptions}
          />

          <Dropdown
              {...props}
              key={filters.dateRange || "cleared"}
              label="Date range"
              marginBottom="sm"
              onSelect={(option) =>
                updateFilter("dateRange")(option ? option.id : "")
              }
              variant="quickpick"
          />

          <DatePicker
              {...props}
              inputValue={filters.startDate}
              label="Start date"
              onChange={updateFilter("startDate")}
              pickerId="filter-panel-start-date"
          />

          <Flex
              {...props}
              spacing="between"
          >
            <Button
                {...props}
                onClick={closePopover}
                text="Apply"
            />
            <Button
                {...props}
                onClick={handleClear}
                text="Clear"
                variant="secondary"
            />
          </Flex>
        </form>
      )}
    </Filter>
  );
};

export default FilterInteractive;
