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
        inputDark
        pickerId="date-picker-input3"
    />
    <DatePicker
        defaultDate="blank"
        disableInput
        pickerId="date-picker-input4"
        placeholder="Disabled Input"
    />
    <DatePicker
        hideLabel
        inputDark
        pickerId="date-picker-input5"
    />
  </div>
)

export default DatePickerInput
