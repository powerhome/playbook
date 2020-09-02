import React from 'react'
import { DatePicker } from '../../'

const DatePickerInput = () => (
  <div>
    <DatePicker
        inputAria={{ label: 'input-field' }}
        inputData={{ key: 'value', key2: 'value2' }}
        name="date-field"
        pickerId="date-picker-input1"
        type="date"
    />
    <DatePicker
        defaultDate="blank"
        pickerId="date-picker-input2"
        placeholder="Select Date"
    />
    <DatePicker
        defaultDate="blank"
        disableInput
        pickerId="date-picker-input3"
        placeholder="Disabled Input"
    />
    <DatePicker
        dark
        hideLabel
        pickerId="date-picker-input4"
    />
  </div>
)

export default DatePickerInput
