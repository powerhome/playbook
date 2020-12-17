import React from 'react'
import { Button, FormGroup, TextInput } from '../../'

const FormGroupButton = (props) => (
  <div>
    <div>
      <FormGroup>
        <TextInput
            label="With Label"
            placeholder="Search"
            {...props}
        />
        <Button
            onClick={() => alert('Button Clicked!')}
            text="Submit"
            variant="secondary"
            {...props}
        />
      </FormGroup>
    </div>
    <br />
    <div>
      <FormGroup>
        <TextInput
            placeholder="Search"
            {...props}
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
