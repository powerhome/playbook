import React, {useState} from 'react'
import { Textarea } from '../..'

const TextareaError = (props) => {
  const [value, setValue] = useState('default value text')
  const handleChange = (event) => {
    setValue(event.target.value)
  }
  return (
    <div>
      <Textarea
          error="This field has an error!"
          label="Label"
          name="comment"
          onChange={(e)=> handleChange(e)}
          placeholder="Placeholder text"
          value={value}
          {...props}
      />

    </div>
  )
}

export default TextareaError
