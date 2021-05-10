import React, { useState } from 'react'
import { TextInput } from '../../'

const TextInputInline = (props) => {
  const [value, setValue] = useState('Inline Input')
  const handleValueChange = ({ target }) => {
    setValue(target.value)
  }
  return (
    <div>
      <TextInput
          inline
          label="Hover Over Text Below"
          onChange={handleValueChange}
          value={value}
          {...props}
      />
    </div>
  )
}

export default TextInputInline
