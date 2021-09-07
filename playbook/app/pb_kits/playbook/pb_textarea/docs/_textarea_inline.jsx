import React from 'react'

import Textarea from '../_textarea'

const TextareaInline = (props) => {
  return (
    <div>
      <Textarea
          rows={1}
          value="Try hovering over this text. Then try modifying it or adding more of your own text."
          {...props}
      />
    </div>
  )
}

export default TextareaInline
