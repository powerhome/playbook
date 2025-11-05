import React from "react";
import Dropdown from "../../pb_dropdown/_dropdown";
import DatePicker from "../../pb_date_picker/_date_picker";

const DatePickerAndDropdownRange = (props) => {
  return (
    <>
      <Dropdown
          controlsEndId="end-date-picker1"
          controlsStartId="start-date-picker1"
          id="dropdown-as-quickpick"
          label="Date Range"
          marginBottom="sm"
          placeholder="Select a Date Range"
          variant="quickpick"
          {...props}
      /> 

      <DatePicker
          label="Start Date"
          pickerId="start-date-picker1"
          placeholder="Select a Start Date"
          syncStartWith="dropdown-as-quickpick"
          {...props}
      />

      <DatePicker
          label="End Date"
          pickerId="end-date-picker1"
          placeholder="Select an End Date"
          syncEndWith="dropdown-as-quickpick"
          {...props}
      />
    </>
  );
};

export default DatePickerAndDropdownRange;
