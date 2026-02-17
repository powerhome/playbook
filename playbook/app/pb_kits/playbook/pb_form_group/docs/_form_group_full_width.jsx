import React from 'react'

import FormGroup from '../_form_group'
import TextInput from '../../pb_text_input/_text_input'
import Button from '../../pb_button/_button'

const FormGroupFullWidth = (props) => (
  <div>
    <div>
      <FormGroup fullWidth>
        <TextInput
            id="first-name-full-width"
            label="First Name"
            placeholder="Enter First Name"
            {...props}
        />
        <TextInput
            id="middle-initial-full-width"
            label="Middle Initial"
            placeholder="Enter Middle Initial"
            {...props}
        />
        <TextInput
            id="last-name-full-width"
            label="Last Name"
            placeholder="Enter Last Name"
            {...props}
        />
      </FormGroup>
    </div>
    <br />
    <div>
      <FormGroup fullWidth>
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

export default FormGroupFullWidth
