import React from 'react'
import {
  TextInput,
} from '../..'

const TextInputError = () => (
  <div>
    <TextInput
        error="Please enter a valid email address"
        label="Email Address"
        placeholder="Enter email address"
        type="email"
    />
  </div>
)

export default TextInputError
