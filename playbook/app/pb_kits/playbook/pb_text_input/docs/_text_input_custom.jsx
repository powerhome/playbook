import React, { useState } from 'react'

import TextInput from '../_text_input'

const TextInputCustom = (props) => {
  const [name, setName] = useState('')
  const handleUpdateName = ({ target }) => {
    setName(target.value)
  }
  return (
    <div>
      <TextInput
          label="Custom Label"
          {...props}
      >
        <input
            name="custom-name"
            onChange={handleUpdateName}
            placeholder="custom-placeholder"
            type="text"
            value={name}
            {...props}
        />
      </TextInput>
    </div>
  )
}

export default TextInputCustom
