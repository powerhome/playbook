import React, { useState } from 'react'

import TextInput from '../_text_input'
import Icon from '../../pb_icon/_icon'

const TextInputError = (props) => {
  const [email, setEmail] = useState('')

  const handleUpdateEmail = ({ target }) => {
    setEmail(target.value)
  }

  const error = (
    <>
      <Icon icon="warning" /> Please enter a valid email address
    </>
  )
  
  return (
    <div>
      <TextInput
          addOn={{ icon: 'user', alignment: 'left', border: true }}
          error={error}
          label="Email Address"
          onChange={handleUpdateEmail}
          placeholder="Enter email address"
          type="email"
          value={email}
          {...props}
      />
      <TextInput
          addOn={{ icon: 'user', alignment: 'left', border: true }}
          label="Confirm Email Address"
          onChange={handleUpdateEmail}
          placeholder="Confirm email address"
          type="email"
          value={email}
          {...props}
      />
    </div>
  )
}
export default TextInputError
