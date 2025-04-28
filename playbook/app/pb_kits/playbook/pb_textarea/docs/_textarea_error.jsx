import React, {useState} from 'react'
import Textarea from '../../pb_textarea/_textarea'
import Icon from '../../pb_icon/_icon'

const TextareaError = (props) => {
  const [value, setValue] = useState('default value text')
  const handleChange = (event) => {
    setValue(event.target.value)
  }
  const error = (
    <>
        <Icon icon="warning" /> This field has an error!
    </>
  )
  return (
    <div>
      <Textarea
          error={error}
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
