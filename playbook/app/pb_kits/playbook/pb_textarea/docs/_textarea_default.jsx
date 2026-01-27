import React, {useState} from 'react'

import Textarea from '../_textarea'

const TextareaDefault = (props) => {
  const [value, setValue] = useState('Default value text')
  const handleChange = (event) => {
    setValue(event.target.value)
  }
  return (
    <div>
      <Textarea
          label="Label"
          rows={4}
          {...props}
          id="default-example-1"
      />

      <br />

      <Textarea
          label="Label"
          placeholder="Placeholder text"
          {...props}
          id="default-example-2"
      />

      <br />

      <Textarea
          label="Label"
          name="comment"
          onChange={(e) => handleChange(e)}
          placeholder="Placeholder text"
          value={value}
          {...props}
          id="default-example-3"
      />

    </div>
  )
}

export default TextareaDefault
