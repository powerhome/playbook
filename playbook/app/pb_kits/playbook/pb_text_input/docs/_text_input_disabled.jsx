import React from 'react'

import TextInput from '../_text_input'

const TextInputDisabled = (props) => {
  return (
    <div>
      <TextInput
          disabled
          label="Last Name"
          placeholder="Enter last name"
          {...props}
      />
    </div>
  )
}

export default TextInputDisabled
