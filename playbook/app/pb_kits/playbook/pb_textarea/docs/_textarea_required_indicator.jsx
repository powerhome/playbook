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
          name="comment"
          onChange={(e) => handleChange(e)}
          placeholder="Placeholder text"
          requiredIndicator
          value={value}
          {...props}
      />
    </div>
  )
}

export default TextareaDefault
