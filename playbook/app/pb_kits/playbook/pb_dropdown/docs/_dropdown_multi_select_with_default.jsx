import React from "react";
import Dropdown from "../../pb_dropdown/_dropdown";

const DropdownMultiSelectWithDefault = (props) => {
  const options = [
    {
      label: "United States",
      value: "unitedStates",
      id: "us"
    },
    {
      label: "United Kingdom",
      value: "unitedKingdom",
      id: "gb"
    },  
    {
      label: "Canada",
      value: "canada",
      id: "ca"
    },
    {
      label: "Pakistan",
      value: "pakistan",
      id: "pk"
    },
    {
      label: "India",
      value: "india",
      id: "in"
    },
    {
      label: "Australia",
      value: "australia",
      id: "au"
    },
    {
      label: "New Zealand",
      value: "new Zealand",
      id: "nz"
    },
    {
      label: "Italy",
      value: "italy",
      id: "it"
    },
    {
      label: "Spain",
      value: "spain",
      id: "es"
    }
  ];  

  const defaultSelectedOptions = [
    {
      label: "United States",
      value: "unitedStates",
    },
    {
      label: "Italy",
      value: "italy",
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
