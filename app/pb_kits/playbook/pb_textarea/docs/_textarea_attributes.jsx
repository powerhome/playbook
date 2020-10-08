import React from 'react'
import { Textarea } from '../..'

const TextareaAttributes = (props) => {
  return (
    <div>
      <Textarea
          disabled
          label="Disabled"
          {...props}
      />

      <br />

      <Textarea
          label="Min & Max Character Length"
          maxLength={10}
          minLength={5}
          placeholder="This has a minlength of 5 and a maxlength of 10 characters."
          {...props}
      />

      <br />

      <Textarea
          label="Required"
          name="required"
          placeholder="This textarea is required."
          required
          {...props}
      />

    </div>
  )
}

export default TextareaAttributes

