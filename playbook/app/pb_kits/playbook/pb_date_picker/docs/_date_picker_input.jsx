import React from 'react'

import DatePicker from '../_date_picker'

const DatePickerInput = (props) => (
  <div>
    <DatePicker
        inputAria={{ label: 'input-field' }}
        inputData={{ key: 'value', key2: 'value2' }}
        label="Aria, Name, and Data Attributes"
        name="date-field"
        pickerId="date-picker-input1"
        {...props}
    />
    <DatePicker
        label="Custom Placeholder"
        pickerId="date-picker-input2"
        placeholder="custom-placeholder"
        {...props}
    />
    <DatePicker
        label="Blank Placeholder"
        pickerId="date-picker-input3"
        placeholder=""
        {...props}
    />
    <DatePicker
        disableInput
        label="Disable Input"
        pickerId="date-picker-input4"
        placeholder="Disabled Input"
        {...props}
    />
  </div>
)

export default DatePickerInput
