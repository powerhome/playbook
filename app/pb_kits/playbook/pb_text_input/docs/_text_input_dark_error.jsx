import React from 'react'
import {
  TextInput,
} from '../..'

const TextInputDarkError = () => (
  <div>
    <TextInput
        dark
        error="Please enter a valid email address"
        label="Email Address"
        placeholder="Enter email address"
        type="email"
    />
  </div>
)

export default TextInputDarkError
