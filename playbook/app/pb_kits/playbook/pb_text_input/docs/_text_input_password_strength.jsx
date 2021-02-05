import React, { useState } from 'react'
import { TextInput } from '../../'

const TextInputPasswordStrength = (props) => {
  const [value, setValue] = useState('')

  const customStrengthCalc = (password) => {
    let warning = ''
    const suggestions = []
    const length = password.length

    if (length < 5) warning = 'Password is too short!'

    let uniqChars = 0
    if (/[a-z]/.test(password)) {
      uniqChars += 26
    } else {
      suggestions.push('Use some lowercase letters')
    }
    if (/[A-Z]/.test(password)) {
      uniqChars += 26
    } else {
      suggestions.push('Use some capitol letters')
    }
    if (/[0-9]/.test(password)) {
      uniqChars += 10
    } else {
      suggestions.push('Use some numbers')
    }

    let score = 0
    const entropy = Math.log(uniqChars ** length) / Math.log(2)
    if (entropy > 0 && entropy <= 28) {
      score = 1
    } else if (entropy > 28 && entropy <= 35) {
      score = 2
    } else if (entropy > 35 && entropy <= 59) {
      score = 3
    } else if (entropy > 59 && entropy <= 127) {
      score = 4
    } else if (entropy > 127) {
      score = 4
      suggestions.push('So strong, wow')
    }

    return { feedback: { warning, suggestions }, score }
  }

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
      <TextInput
          label="Password"
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter a password"
          value={value}
          variant="passwordStrength1"
          {...props}
      />
      <TextInput
          label="Password"
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter a password"
          value={value}
          variant="passwordStrength2"
          {...props}
      />
      <TextInput
          id="4th-variant"
          label="Password"
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter a password"
          value={value}
          variant="passwordStrength3"
          {...props}
      />
      <TextInput
          id="5th-variant"
          label="Password"
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter a password"
          value={value}
          variant="passwordStrength4"
          {...props}
      />
      <TextInput
          id="5th-variant-custom"
          label="Password"
          onChange={(e) => setValue(e.target.value)}
          passwordCalc={customStrengthCalc}
          placeholder="Enter a password"
          value={value}
          variant="passwordStrength4"
          {...props}
      />
    </div>
  )
}

export default TextInputPasswordStrength
