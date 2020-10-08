import React from 'react'
import { Textarea } from '../..'

const TextareaError = (props) => {
  return (
    <div>
      <Textarea
          error="This field has an error!"
          label="Label"
          name="comment"
          placeholder="Placeholder text"
          value="Default value text"
          {...props}
      />

    </div>
  )
}

export default TextareaError
