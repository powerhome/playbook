import React from 'react'
import { Textarea } from '../..'

const TextareaDarkError = () => {
  return (
    <div>
      <Textarea
          dark
          error="This field has an error!"
          label="Label"
          name="comment"
          placeholder="Placeholder text"
          value="Default value text"
      />
    </div>
  )
}

export default TextareaDarkError
