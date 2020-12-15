import React from 'react'
import { DatePicker } from '../../'

const DatePickerInput = (props) => (
  <div>
    <DatePicker
        {...props}
        inputAria={{ label: 'input-field' }}
        inputData={{ key: 'value', key2: 'value2' }}
        label="Aria, Name, and Data Attributes"
        name="date-field"
        pickerId="date-picker-input1"
    />
    <DatePicker
        {...props}
        label="Custom Placeholder"
        pickerId="date-picker-input2"
        placeholder="custom-placeholder"
    />
    <DatePicker
        {...props}
        label="Blank Placeholder"
        pickerId="date-picker-input3"
        placeholder=""
    />
    <DatePicker
        {...props}
        disableInput
        label="Disable Input"
        pickerId="date-picker-input4"
        placeholder="Disabled Input"
    />
  </div>
)

export default DatePickerInput
