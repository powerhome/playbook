import React, { useState } from 'react'

import FormGroup from '../_form_group'
import TextInput from '../../pb_text_input/_text_input'
import Button from '../../pb_button/_button'

const FormGroupFullWidth = (props) => {
  const [formFields, setFormFields] = useState({
    firstName: '',
    middleInitial: '',
    lastName: '',
  })
  const [search, setSearch] = useState('')

  const handleOnChange = ({ target }) => {
    const { name, value } = target
    setFormFields({ ...formFields, [name]: value })
  }

  const handleUpdateSearch = ({ target }) => {
    setSearch(target.value)
  }

  return (
    <div>
      <div>
        <FormGroup fullWidth>
          <TextInput
              id="first-name-full-width"
              label="First Name"
              name="firstName"
              onChange={handleOnChange}
              placeholder="Enter First Name"
              value={formFields.firstName}
              {...props}
          />
          <TextInput
              id="middle-initial-full-width"
              label="Middle Initial"
              name="middleInitial"
              onChange={handleOnChange}
              placeholder="Enter Middle Initial"
              value={formFields.middleInitial}
              {...props}
          />
          <TextInput
              id="last-name-full-width"
              label="Last Name"
              name="lastName"
              onChange={handleOnChange}
              placeholder="Enter Last Name"
              value={formFields.lastName}
              {...props}
          />
        </FormGroup>
      </div>
      <br />
      <div>
        <FormGroup fullWidth>
          <TextInput
              onChange={handleUpdateSearch}
              placeholder="Search"
              value={search}
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
}

export default FormGroupFullWidth
