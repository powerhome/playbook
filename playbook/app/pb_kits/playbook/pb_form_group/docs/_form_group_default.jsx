import React from 'react'
import { FormGroup, TextInput } from '../../'

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
