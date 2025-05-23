import React from "react";
import { DatePicker } from "playbook-ui";

const DateRangeWithMinAndMaxDates = () => {
  return (
    <div>
      <DatePicker
        controlsEndId="end-date-picker"
        controlsStartId="start-date-picker"
        label="Date Range"
        mode="range"
        pickerId="quickpick-for-range"
        placeholder="Select a Range"
        selectionType="quickpick"
        thisRangesEndToday
      />

      <DatePicker
        label="Start Date"
        maxDate={Date.now()}
        minDate="01/01/2021"
        pickerId="start-date-picker"
        placeholder="Select a Start Date"
        syncStartWith="quickpick-for-range"
        yearRange={[2021, new Date().getFullYear()]}
      />

      <DatePicker
        label="End Date"
        maxDate={Date.now()}
        minDate="01/01/2021"
        pickerId="end-date-picker"
        placeholder="Select a End Date"
        syncEndWith="quickpick-for-range"
        yearRange={[2021, new Date().getFullYear()]}
      />
    </div>
  );
}

export default DateRangeWithMinAndMaxDates;