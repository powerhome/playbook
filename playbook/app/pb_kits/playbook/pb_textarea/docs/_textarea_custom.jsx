import React from 'react'
import { Textarea } from '../../'

const TextareaCustom = (props) => {
  return (
    <div>
      <Textarea label="Label">
        <textarea
            className="my_custom_class"
            name="custom_textarea"
            rows={4}
            {...props}
        >
          {'Content goes here.'}
        </textarea>
      </Textarea>
    </div>
  )
}

export default TextareaCustom
