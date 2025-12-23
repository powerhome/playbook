import React, { useState } from 'react'

import TextInput from '../../pb_text_input/_text_input'

const TextInputDefault = (props) => {
  const [firstName, setFirstName] = useState('')
  const handleOnChangeFirstName = ({ target }) => {
    setFirstName(target.value)
  }

  return (
      <TextInput
          id="text_input_required_indicator"
          label="First Name"
          name="firstName"
          onChange={handleOnChangeFirstName}
          placeholder="Enter first name"
          requiredIndicator
          value={firstName}
          {...props}
      />
  )
}

export default TextInputDefault
