import React from 'react'

import Textarea from '../_textarea'

const TextareaInline = (props) => {
  return (
    <div>
      <Textarea
          inline
          rows={1}
          value="Try clicking into this text."
          {...props}
      />
    </div>
  )
}

export default TextareaInline
