import React from 'react'
import { Textarea } from '../../'

const TextareaResize = () => {
  return (
    <div>
      <Textarea
        label="vertical"
        placeholder="Resize Vertical"
        resize="vertical"
      />

      <br />

      <Textarea
        label="both"
        placeholder="Resize Both"
        resize="both"
      />

      <br />

      <Textarea
        label="horizontal"
        placeholder="Resize Horizontal"
        resize="horizontal"
      />

    </div>
  )
}

export default TextareaResize
