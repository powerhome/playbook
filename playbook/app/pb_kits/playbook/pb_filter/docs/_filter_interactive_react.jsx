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
  startDate: "05/01/2026",
};

const statusOptionForValue = (value) =>
  value
    ? statusDropdownOptions.find((opt) => opt.value === value)
    : undefined;

const FilterInteractive = (props) => {
  const [applied, setApplied] = useState(INITIAL_FILTERS);
  const [draft, setDraft] = useState(INITIAL_FILTERS);

  const updateDraft = (key) => (value) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  const handleApply = (closePopover) => {
    setApplied(draft);
    closePopover();
  };

  const handleClear = () => {
    setDraft(applied);
  };

  return (
    <Filter
        filters={{
          Territory: applied.territory,
          Status: applied.status,
          "Start date": applied.startDate,
        }}
        interactiveFilters={{
          Territory: {
            type: "select",
            options: territorySelectOptions,
            value: applied.territory,
            onChange: updateDraft("territory"),
          },
          Status: {
            type: "dropdown",
            options: statusDropdownOptions,
            value: applied.status,
            onChange: updateDraft("status"),
          },
          "Start date": {
            type: "date-picker",
            value: applied.startDate,
            onChange: updateDraft("startDate"),
            format: "m/d/Y",
          },
        }}
        minWidth="360px"
        results={546}
        sortOptions={{
          popularity: "Popularity",
        }}
        sortValue={[{ name: "popularity", dir: "desc" }]}
        {...props}
    >
      {({ closePopover }) => (
        <form>
          <Select
              label="Territory"
              name="location"
              onChange={(e) => updateDraft("territory")(e.target.value)}
              options={territorySelectOptions}
              value={draft.territory}
              {...props}
          />
          <Dropdown
              blankSelection="Select status..."
              defaultValue={statusOptionForValue(draft.status)}
              key={draft.status || "cleared"}
              label="Status"
              onSelect={(option) =>
                updateDraft("status")(option ? option.value : "")
              }
              options={statusDropdownOptions}
          />

          <DatePicker
              inputValue={draft.startDate}
              label="Start date"
              onChange={updateDraft("startDate")}
              pickerId="filter-panel-start-date"
          />

          <Flex
              spacing="between"
              {...props}
          >
            <Button
                onClick={() => handleApply(closePopover)}
                text="Apply"
                {...props}
            />
            <Button
                onClick={handleClear}
                text="Clear"
                variant="secondary"
                {...props}
            />
          </Flex>
        </form>
      )}
    </Filter>
  );
};

export default FilterInteractive;
