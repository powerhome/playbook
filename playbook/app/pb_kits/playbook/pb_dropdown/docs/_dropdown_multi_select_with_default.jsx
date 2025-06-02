import React from "react";
import Dropdown from "../../pb_dropdown/_dropdown";

const DropdownMultiSelectWithDefault = (props) => {
  const options = [
    {
      label: "United States",
      value: "United States",
    },
    {
      label: "United Kingdom",
      value: "United Kingdom",
    },
    {
      label: "Canada",
      value: "Canada",
    },
    {
      label: "Pakistan",
      value: "Pakistan",
    },
    {
      label: "India",
      value: "India",
    },
    {
      label: "Australia",
      value: "Australia",
    },
    {
      label: "New Zealand",
      value: "New Zealand",
    },
    {
      label: "Italy",
      value: "Italy",
    },
    {
      label: "Spain",
      value: "Spain",
    },
  ];

  const defaultSelectedOptions = [
    {
      label: "United States",
      value: "United States",
    },
    {
      label: "Italy",
      value: "Italy",
    },
  ];

  return (
    <div>
      <Dropdown
          defaultValue={defaultSelectedOptions}
          multiSelect
          options={options}
          {...props}
      />
    </div>
  );
};

export default DropdownMultiSelectWithDefault;
