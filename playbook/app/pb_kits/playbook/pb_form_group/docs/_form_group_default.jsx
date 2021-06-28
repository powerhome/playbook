import React from 'react'

import FormGroup from '../_form_group'
import TextInput from '../../pb_text_input/_text_input'

const FormGroupDefault = (props) => (
  <div>
    <FormGroup>
      <TextInput
          label="First Name"
          placeholder="Enter First Name"
          {...props}
      />
      <TextInput
          label="Middle Intial"
          placeholder="Enter Middle Initial"
          {...props}
      />
      <TextInput
          label="Last Name"
          placeholder="Enter Last Name"
          {...props}
      />
    </FormGroup>
  </div>
)

export default FormGroupDefault
