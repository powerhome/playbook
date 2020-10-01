import React from 'react'
import { Textarea } from '../..'

const TextareaDefault = () => {
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
          value="This has a minlength of 5 and a maxlength of 10 characters."
      />

      <br />

      <Textarea
          label="Required"
          name="required"
          placeholder="Placeholder text"
          required
          value="This textarea is required."
      />

    </div>
  )
}

export default TextareaDefault

