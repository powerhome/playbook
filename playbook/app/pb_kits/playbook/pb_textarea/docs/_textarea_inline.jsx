import React, { useState } from 'react'

import Textarea from '../_textarea'

const TextareaInline = (props) => {
  const [value, setValue] = useState('Try clicking into this text.')
  const handleChange = (event) => {
    setValue(event.target.value)
  }
  return (
    <div>
      <Textarea
          inline
          onChange={(e) => handleChange(e)}
          resize="auto"
          rows={1}
          value={value}
          {...props}
      />
    </div>
  )
}

export default TextareaInline
