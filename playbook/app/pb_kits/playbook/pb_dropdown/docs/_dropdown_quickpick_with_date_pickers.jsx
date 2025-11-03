import React from "react";
import Dropdown from "../../pb_dropdown/_dropdown";
import DatePicker from "../../pb_date_picker/_date_picker";

const DropdownQuickpickWithDatePickers = (props) => {
  return (
    <>
      <Dropdown
          controlsEndId="end-date-picker"
          controlsStartId="start-date-picker"
          id="dropdown-quickpick"
          label="Quick Pick Range"
          marginBottom="sm"
          variant="quickpick"
          {...props}
      /> 

      <DatePicker
          label="Start Date"
          pickerId="start-date-picker"
          placeholder="Select a Start Date"
          syncStartWith="dropdown-quickpick"
          {...props}
      />

      <DatePicker
          label="End Date"
          pickerId="end-date-picker"
          placeholder="Select an End Date"
          syncEndWith="dropdown-quickpick"
          {...props}
      />
    </>
  );
};

export default DropdownQuickpickWithDatePickers;
