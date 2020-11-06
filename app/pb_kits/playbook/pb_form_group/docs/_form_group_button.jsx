import React from 'react'
import { Button, FormGroup, TextInput } from '../../'

const FormGroupButton = (props) => (
  <div>
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
    <div>
      <FormGroup>
        <TextInput
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
  </div>
)

export default FormGroupButton
