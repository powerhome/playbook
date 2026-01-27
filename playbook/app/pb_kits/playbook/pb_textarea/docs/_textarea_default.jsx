import React, {useState} from 'react'

import Textarea from '../_textarea'

const TextareaDefault = (props) => {
  const [value, setValue] = useState('Example of comment text')
  const handleChange = (event) => {
    setValue(event.target.value)
  }
  return (
    <div>
      <Textarea
          label="Label"
          rows={4}
          {...props}
          id="example-1"
      />

      <br />

      <Textarea
          label="Label"
          placeholder="Placeholder text"
          {...props}
          id="example-2"
      />

      <br />

      <Textarea
          label="Comment"
          name="comment"
          onChange={(e) => handleChange(e)}
          placeholder="Placeholder text"
          value={value}
          {...props}
          id="comment"
      />

    </div>
  )
}

export default TextareaDefault
