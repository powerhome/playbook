import React, { useState } from 'react'

import FormGroup from '../_form_group'
import TextInput from '../../pb_text_input/_text_input'

const FormGroupDefault = (props) => {
  const [formFields, setFormFields] = useState({
    firstName: '',
    middleInitial: '',
    lastName: '',
  })

  const handleOnChange = ({ target }) => {
    const { name, value } = target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div>
      <FormGroup>
        <TextInput
            id="first-name"
            label="First Name"
            name="firstName"
            onChange={handleOnChange}
            placeholder="Enter First Name"
            value={formFields.firstName}
            {...props}
        />
        <TextInput
            id="middle-initial"
            label="Middle Initial"
            name="middleInitial"
            onChange={handleOnChange}
            placeholder="Enter Middle Initial"
            value={formFields.middleInitial}
            {...props}
        />
        <TextInput
            id="last-name"
            label="Last Name"
            name="lastName"
            onChange={handleOnChange}
            placeholder="Enter Last Name"
            value={formFields.lastName}
            {...props}
        />
      </FormGroup>
    </div>
  )
}

export default FormGroupDefault
