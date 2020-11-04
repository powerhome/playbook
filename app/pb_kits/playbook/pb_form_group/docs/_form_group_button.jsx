import React from 'react'
import { Button, FormGroup, TextInput } from '../../'

const FormGroupButton = (props) => (
  <div>
    <FormGroup>
      <TextInput
          label="hello"
          placeholder="heelo world"
      />
      <Button
          onClick={() => alert('button clicked!')}
          text="Button Secondary"
          variant="secondary"
          {...props}
      />
    </FormGroup>
  </div>
)

export default FormGroupButton
