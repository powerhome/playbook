import React from "react";
import DatePicker from "../_date_picker";

const DatePickerRangePattern = (props) => {
  return (
    <>
      <DatePicker
          controlsEndId="end-date-picker"
          controlsStartId="start-date-picker"
          mode="range"
          pickerId="quickpick-for-range"
          placeholder="Select a Range"
          selectionType="quickpick"
          {...props}
      />

      <DatePicker
          pickerId="start-date-picker"
          placeholder="Select a Start Date"
          syncStartWith="quickpick-for-range"
          {...props}
      />

      <DatePicker
          pickerId="end-date-picker"
          placeholder="Select an End Date"
          syncEndWith="quickpick-for-range"
          {...props}
      />
    </>
  );
};

export default DatePickerRangePattern;
