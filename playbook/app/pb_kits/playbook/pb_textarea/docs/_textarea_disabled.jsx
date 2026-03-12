import React from 'react'

import Textarea from '../_textarea'

const TextareaDefault = (props) => {
  return (
    <>
      <Textarea
          disabled
          id="disabled-example"
          label="Disabled"
          {...props}
          rows={4}
      />
      <Textarea
          disabled
          id="disabled-example-with-placeholder"
          label="Disabled with Placeholder"
          placeholder="Content goes here"
          {...props}
          rows={4}
      />
    </>
  )
}

export default TextareaDefault
