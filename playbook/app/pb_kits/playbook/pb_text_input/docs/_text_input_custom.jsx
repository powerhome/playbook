import React, { useState } from 'react'
import { TextInput } from '../../'

const TextInputCustom = () => {
  const [name, setName] = useState('')
  const handleUpdateName = ({ target }) => {
    setName(target.value)
  }
  return (
    <div>
      <TextInput
          label="Custom Label"
      >
        <input
            name="custom-name"
            onChange={handleUpdateName}
            placeholder="custom-placeholder"
            type="text"
            value={name}
        />
      </TextInput>
    </div>
  )
}

export default TextInputCustom
