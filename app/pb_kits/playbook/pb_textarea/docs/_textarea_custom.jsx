import React from 'react'
import { Textarea } from '../../'

const TextareaCustom = () => {
  return (
    <div>
      <Textarea label="Label">
        <textarea
            className="my_custom_class"
            name="custom_textarea"
            rows={4}
        >
          {'Content goes here.'}
        </textarea>
      </Textarea>
    </div>
  )
}

export default TextareaCustom
