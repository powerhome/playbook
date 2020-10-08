import React from 'react'
import { Textarea } from '../../'

const TextareaCustom = (props) => {
  return (
    <div>
      <Textarea
          label="Label"
          {...props}
      >
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
