import React from 'react'
import { FormGroup, TextInput } from '../../'

const FormGroupDefault = () => (
  <div>
    <FormGroup>
      <TextInput
          label="hello"
          placeholder="heelo world"
      />
      <TextInput
          label="hello1"
          placeholder="heelo world1"
      />
      <TextInput
          label="hello2"
          placeholder="heelo world2"
      />
    </FormGroup>
  </div>
)

export default FormGroupDefault
