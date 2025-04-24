import React, { useState } from "react";
import DatePicker from "../_date_picker";

const DatePickerRangePattern = (props) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleQuickPickClose = (selectedDates) => {
    if (selectedDates?.length === 2) {
      setStartDate(selectedDates[0]);
      setEndDate(selectedDates[1]);
    }
  };

  const handleStartDateClose = (selectedDates) => {
    if (selectedDates?.length) {
      setStartDate(selectedDates[0]);
      document.querySelector('#date-picker-quick-pick-range')._flatpickr.clear()
    }
  };

  const handleEndDateClose = (selectedDates) => {
    if (selectedDates?.length) {
      setEndDate(selectedDates[0]);
      document.querySelector('#date-picker-quick-pick-range')._flatpickr.clear()
    }
  };

  return (
    <>
      <DatePicker
          mode="range"
          onClose={handleQuickPickClose}
          pickerId="date-picker-quick-pick-range"
          placeholder="mm/dd/yyyy to mm/dd/yyyy"
          selectionType="quickpick"
          {...props}
      />
      <DatePicker
          defaultDate={startDate}
          onClose={handleStartDateClose}
          pickerId="date-picker-start"
          placeholder="Start Date"
          {...props}
      />
      <DatePicker
          defaultDate={endDate}
          onClose={handleEndDateClose}
          pickerId="date-picker-end"
          placeholder="End Date"
          {...props}
      />
    </>
  );
};

export default DatePickerRangePattern;
