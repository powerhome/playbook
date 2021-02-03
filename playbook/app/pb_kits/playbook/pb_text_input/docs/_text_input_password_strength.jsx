import React, { useState } from 'react'
import { TextInput } from '../../'

const TextInputPasswordStrength = (props) => {
  const [value, setValue] = useState('')
  return (
    <div>
      <TextInput
          label="Password"
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter a password"
          value={value}
          variant="passwordStrength"
          {...props}
      />
    </div>
  )
}

export default TextInputPasswordStrength
