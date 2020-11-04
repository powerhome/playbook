import React from 'react'
import { DatePicker, FormGroup, TextInput } from '../../'

const FormGroupDatePicker = () => (
  <div>
    <FormGroup>
      <TextInput
          label="hello"
          placeholder="heelo world"
      />
      <DatePicker
          pickerId="date-picker-default"
      />
    </FormGroup>
  </div>
)

export default FormGroupDatePicker
