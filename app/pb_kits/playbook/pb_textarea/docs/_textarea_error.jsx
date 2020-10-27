import React from 'react'
import { Textarea } from '../..'

const TextareaError = () => {
  return (
    <div>
      <Textarea
          error
          errorMessage="This field has an error!"
          label="Label"
          name="comment"
          placeholder="Placeholder text"
          value="Default value text"
      />

    </div>
  )
}

export default TextareaError
