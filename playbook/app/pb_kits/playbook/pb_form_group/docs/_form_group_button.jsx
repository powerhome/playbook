import React from 'react'

import Button from '../../pb_button/_button'
import FormGroup from '../../pb_form_group/_form_group'
import TextInput from '../../pb_text_input/_text_input'

const FormGroupButton = (props) => (
  <div>
    <div>
      <FormGroup>
        <TextInput
            id="search-with-label"
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
