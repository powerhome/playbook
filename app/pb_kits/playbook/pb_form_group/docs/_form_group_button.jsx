import React from 'react'
import { Button, FormGroup, TextInput } from '../../'

const FormGroupButton = (props) => (
  <div>
    <FormGroup>
      <TextInput
          label="Text"
          placeholder="Enter Text"
      />
      <Button
          onClick={() => alert('Button Clicked!')}
          text="Submit"
          variant="secondary"
          {...props}
      />
    </FormGroup>
  </div>
)

export default FormGroupButton
