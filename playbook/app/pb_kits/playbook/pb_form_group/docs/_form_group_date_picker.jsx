import React from 'react'

import FormGroup from '../_form_group'

import DatePicker from '../../pb_date_picker/_date_picker'
import TextInput from '../../pb_text_input/_text_input'

const FormGroupDatePicker = (props) => (
  <div>
    <FormGroup>
      <TextInput
          id="event-name"
          label="Event"
          placeholder="Event Name"
          {...props}
      />
      <DatePicker
          id="event-date"
          label="event date"
          pickerId="date-picker-default"
          {...props}
      />
    </FormGroup>
  </div>
)

export default FormGroupDatePicker
