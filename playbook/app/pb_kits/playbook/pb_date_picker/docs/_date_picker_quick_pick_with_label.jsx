import React, { useState } from "react"
import DatePicker from "../_date_picker"

const DatePickerQuickPickWithLabel = (props) => {
  const [inputValue, setInputValue] = useState('');

  const handleDateChange = (dateStr, selectedDates, quickpickLabel) => {
    console.log('Date string:', dateStr);
    console.log('Selected dates:', selectedDates);
    console.log('Quickpick label:', quickpickLabel);

    // Control what gets displayed in the input field
    if (quickpickLabel) {
      // Show the quickpick label (e.g., "This quarter", "Last month")
      setInputValue(quickpickLabel);
    } else if (selectedDates.length > 0) {
      // Show the formatted date range for manual selections
      setInputValue(dateStr);
    } else {
      // Clear the input when no dates are selected
      setInputValue('');
    }

    // Call any additional onChange logic from props
    if (props.onChange) {
      props.onChange(dateStr, selectedDates, quickpickLabel);
    }
  };

  return (
    <>
      <DatePicker
          allowInput
          inputValue={inputValue}
          mode="range"
          onChange={handleDateChange}
          pickerId="date-picker-quick-pick-with-label"
          placeholder="mm/dd/yyyy to mm/dd/yyyy"
          selectionType="quickpick"
          {...props}
      />
    </>
  )
}

export default DatePickerQuickPickWithLabel
