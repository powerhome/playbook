import React from 'react'
import { DatePicker, FormGroup, TextInput } from '../../'

const FormGroupDatePicker = () => (
  <div>
    <FormGroup>
      <TextInput
          label="Event"
          placeholder="Event Name"
      />
      <DatePicker
          label="event date"
          pickerId="date-picker-default"
      />
    </FormGroup>
  </div>
)

export default FormGroupDatePicker
