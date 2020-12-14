import React, { useState } from 'react'
import {
  Caption,
  TextInput,
  Title,
} from '../../'

const TextInputDefault = () => {
  const handleOnChangeFirstName = ({ target }) => {
    setFirstName(target.value)
  }
  const ref = React.createRef()

  const [firstName, setFirstName] = useState('')

  return (
    <div>
      <TextInput
          aria={{ label: 'hello' }}
          data={{ say: 'hi', yell: 'go' }}
          id="unique-id"
          label="First Name"
          placeholder="Enter first name"
          value="Tim Wenhold"
      />
      <TextInput
          label="Last Name"
          placeholder="Enter last name"
      />
      <TextInput
          label="Phone Number"
          placeholder="Enter phone number"
          type="phone"
      />
      <TextInput
          label="Email Address"
          placeholder="Enter email address"
          type="email"
      />
      <TextInput
          label="Zip Code"
          placeholder="Enter zip code"
          type="number"
      />

      <br />
      <br />

      <Title>{'Event Handler Props'}</Title>

      <br />
      <Caption>{'onChange'}</Caption>

      <br />

      <TextInput
          label="First Name"
          onChange={handleOnChangeFirstName}
          placeholder="Enter first name"
          ref={ref}
          value={firstName}
      />

      <If condition={firstName !== ''}>
        {`First name is: ${firstName}`}
      </If>
    </div>
  )
}

export default TextInputDefault
