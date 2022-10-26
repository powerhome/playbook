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
      />

      <br />

      <Textarea
          label="Label"
          placeholder="Placeholder text"
          {...props}
      />

      <br />

      <Textarea
          label="Label"
          name="comment"
          onChange={(e) => handleChange(e)}
          placeholder="Placeholder text"
          value={value}
          {...props}
      />

    </div>
  )
}

export default TextareaDefault
