import React from 'react'
import { DatePicker, FormGroup, TextInput } from '../../'

const FormGroupDatePicker = (props) => (
  <div>
    <FormGroup>
      <TextInput
          label="Event"
          placeholder="Event Name"
          {...props}
      />
      <DatePicker
          label="event date"
          pickerId="date-picker-default"
          {...props}
      />
    </FormGroup>
  </div>
)

export default FormGroupDatePicker
