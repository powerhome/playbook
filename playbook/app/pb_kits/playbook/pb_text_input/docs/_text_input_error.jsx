import React, { useState } from 'react'
import {
  TextInput,
} from '../..'

const TextInputError = (props) => {
  const [email, setEmail] = useState('')

  const handleUpdateEmail = ({ target }) => {
    setEmail(target.value)
  }
  return (
    <div>
      <TextInput
          error="Please enter a valid email address"
          label="Email Address"
          onChange={handleUpdateEmail}
          placeholder="Enter email address"
          type="email"
          value={email}
          {...props}
      />
    </div>
  )
}
export default TextInputError
