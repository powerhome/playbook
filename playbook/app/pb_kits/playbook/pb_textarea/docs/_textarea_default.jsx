import React from 'react'
import { Textarea } from '../../'

const TextareaDefault = (props) => {
  return (
    <div>
      <Textarea
          label="Label"
          rows={4}
          {...props}
      />

      <br />

      <Textarea
          label="Label"
          placeholder="Placeholder text"
          {...props}
      />

      <br />

      <Textarea
          label="Label"
          name="comment"
          placeholder="Placeholder text"
          value="Default value text"
          {...props}
      />

    </div>
  )
}

export default TextareaDefault
