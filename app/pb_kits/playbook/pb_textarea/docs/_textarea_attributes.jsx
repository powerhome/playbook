import React from 'react'
import { Textarea } from '../..'

const TextareaAttributes = () => {
  return (
    <div>
      <Textarea
          disabled
          label="Disabled"
      />

      <br />

      <Textarea
          label="Min & Max Character Length"
          maxLength={10}
          minLength={5}
          placeholder="This has a minlength of 5 and a maxlength of 10 characters."
      />

      <br />

      <Textarea
          label="Required"
          name="required"
          placeholder="This textarea is required."
          required
      />

    </div>
  )
}

export default TextareaAttributes

