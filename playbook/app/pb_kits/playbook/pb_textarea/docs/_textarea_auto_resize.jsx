import React from 'react'
import { Textarea } from '../../'

const TextareaAutoResize = (props) => {
  const handleKeyDown = (e) => {
    e.target.style.height = 'inherit'
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  return (
    <div>
      <Textarea label="Label">
        <textarea
            onKeyDown={handleKeyDown}
            {...props}
        >
          {'Content goes here.'}
        </textarea>
      </Textarea>
    </div>
  )
}

export default TextareaAutoResize
