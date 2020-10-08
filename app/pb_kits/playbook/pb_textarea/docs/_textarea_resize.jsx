import React from 'react'
import { Textarea } from '../../'

const TextareaResize = (props) => {
  return (
    <div>
      <Textarea
          label="vertical"
          placeholder="Resize Vertical"
          resize="vertical"
          {...props}
      />

      <br />

      <Textarea
          label="both"
          placeholder="Resize Both"
          resize="both"
          {...props}
      />

      <br />

      <Textarea
          label="horizontal"
          placeholder="Resize Horizontal"
          resize="horizontal"
          {...props}
      />
    </div>
  )
}

export default TextareaResize
