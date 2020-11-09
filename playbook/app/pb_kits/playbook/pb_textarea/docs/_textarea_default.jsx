import React from 'react'
import { Textarea } from '../../'

const TextareaDefault = () => {
  return (
    <div>
      <Textarea
          label="Label"
          rows={4}
      />

      <br />

      <Textarea
          label="Label"
          placeholder="Placeholder text"
      />

      <br />

      <Textarea
          label="Label"
          name="comment"
          placeholder="Placeholder text"
          value="Default value text"
      />

    </div>
  )
}

export default TextareaDefault
