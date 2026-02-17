import React from 'react'

import FormGroup from '../_form_group'
import TextInput from '../../pb_text_input/_text_input'

const FormGroupDefault = (props) => (
  <div>
    <FormGroup>
      <TextInput
          id="first-name"
          label="First Name"
          placeholder="Enter First Name"
          {...props}
      />
      <TextInput
          id="middle-initial"
          label="Middle Initial"
          placeholder="Enter Middle Initial"
          {...props}
      />
      <TextInput
          id="last-name"
          label="Last Name"
          placeholder="Enter Last Name"
          {...props}
      />
    </FormGroup>
  </div>
)

export default FormGroupDefault
