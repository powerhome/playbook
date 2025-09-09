import React, { useState } from 'react'

import Caption from '../../pb_caption/_caption'
import TextInput from '../../pb_text_input/_text_input'
import Title from '../../pb_title/_title'

const TextInputDefault = (props) => {
  const [firstName, setFirstName] = useState('')
  const handleOnChangeFirstName = ({ target }) => {
    setFirstName(target.value)
  }
  const ref = React.createRef()

  const [formFields, setFormFields] = useState({
    firstName: 'Jane',
    lastName: 'Doe',
    phone: '8888888888',
    email: 'jane@doe.com',
    zip: 55555,
  })

  const handleOnChangeFormField =  ({ target }) => {
    const { name, value } = target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div>
      <TextInput
          aria={{ label: 'hello' }}
          data={{ say: 'hi', yell: 'go' }}
          id="unique-id"
          label="First Name"
          name="firstName"
          onChange={handleOnChangeFormField}
          placeholder="Enter first name"
          value={formFields.firstName}
          {...props}
      />
      <TextInput
          id="last-name"
          label="Last Name"
          name="lastName"
          onChange={handleOnChangeFormField}
          placeholder="Enter last name"
          value={formFields.lastName}
          {...props}
      />
      <TextInput
          id="phone"
          label="Phone Number"
          name="phone"
          onChange={handleOnChangeFormField}
          placeholder="Enter phone number"
          type="phone"
          value={formFields.phone}
          {...props}
      />
      <TextInput
          id="email"
          label="Email Address"
          name="email"
          onChange={handleOnChangeFormField}
          placeholder="Enter email address"
          type="email"
          value={formFields.email}
          {...props}
      />
      <TextInput
          id="zip"
          label="Zip Code"
          name="zip"
          onChange={handleOnChangeFormField}
          placeholder="Enter zip code"
          type="number"
          value={formFields.zip}
          {...props}
      />

      <br />
      <br />

      <Title>{'Event Handler Props'}</Title>

      <br />
      <Caption>{'onChange'}</Caption>

      <br />

      <TextInput
          id="first-name"
          label="First Name"
          onChange={handleOnChangeFirstName}
          placeholder="Enter first name"
          ref={ref}
          value={firstName}
          {...props}
      />

      {firstName !== '' && (
        <React.Fragment>{`First name is: ${firstName}`}</React.Fragment>
      )}
    </div>
  )
}

export default TextInputDefault
