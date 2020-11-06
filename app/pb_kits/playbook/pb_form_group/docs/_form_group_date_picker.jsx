import React from 'react'
import { DatePicker, FormGroup, TextInput } from '../../'

const FormGroupDatePicker = () => (
  <div>
    <FormGroup>
      <TextInput
          label="Text"
          placeholder="Enter Text"
      />
      <DatePicker
          pickerId="date-picker-default"
      />
    </FormGroup>
  </div>
)

export default FormGroupDatePicker
