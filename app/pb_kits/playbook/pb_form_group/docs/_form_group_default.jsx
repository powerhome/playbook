import React from 'react'
import { FormGroup, TextInput } from '../../'

const FormGroupDefault = () => (
  <div>
    <FormGroup>
      <TextInput
          label="First Name"
          placeholder="Enter First Name"
      />
      <TextInput
          label="Middle Intial"
          placeholder="Enter Middle Initial"
      />
      <TextInput
          label="Last Name"
          placeholder="Enter Last Name"
      />
    </FormGroup>
  </div>
)

export default FormGroupDefault
