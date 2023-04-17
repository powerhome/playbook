import React, { useState } from 'react'

import TextInput from '../_text_input'

const TextInputNoLabel = (props) => {
  const [email, setEmail] = useState('')

  const handleUpdateEmail = ({ target }) => {
    setEmail(target.value)
  }
  return (
    <div>
      <TextInput
          onChange={handleUpdateEmail}
          placeholder="Enter email address"
          type="email"
          value={email}
          {...props}
      />
    </div>
  )
}
export default TextInputNoLabel
