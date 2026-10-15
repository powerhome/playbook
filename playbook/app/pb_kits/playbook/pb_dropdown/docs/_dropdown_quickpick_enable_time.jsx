import React from "react";
import Dropdown from "../../pb_dropdown/_dropdown";
import DatePicker from "../../pb_date_picker/_date_picker";

const DropdownQuickpickEnableTime = (props) => {
  return (
    <>
      <Dropdown
          controlsEndId="end-date-picker-enable-time"
          controlsStartId="start-date-picker-enable-time"
          id="dropdown-quickpick-enable-time"
          label="Range"
          marginBottom="sm"
          placeholder="Select a Date Range"
          variant="quickpick"
          {...props}
      />

      <DatePicker
          enableTime
          label="Start Date"
          pickerId="start-date-picker-enable-time"
          placeholder="Select a Start Date"
          syncStartWith="dropdown-quickpick-enable-time"
          {...props}
      />

      <DatePicker
          enableTime
          label="End Date"
          pickerId="end-date-picker-enable-time"
          placeholder="Select an End Date"
          syncEndWith="dropdown-quickpick-enable-time"
          {...props}
      />
    </>
  );
};

export default DropdownQuickpickEnableTime;
