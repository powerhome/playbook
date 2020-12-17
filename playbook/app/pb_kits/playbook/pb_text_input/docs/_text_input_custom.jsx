import React from 'react'
import { TextInput } from '../../'

const TextInputCustom = () => {
  return (
    <div>
      <TextInput
          label="Custom Label"
      >
        <input
            name="custom-name"
            placeholder="custom-placeholder"
            type="text"
        />
      </TextInput>
    </div>
  )
}

export default TextInputCustom
