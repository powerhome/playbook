import React, { useState } from 'react'
import { Inline, TextInput, Title } from '../../'

const InlineDefault = (props) => {
  const [formValue, setFormValue] = useState('Default Value')

  const handleInputChange = (event) => {
    setFormValue(event.target.value)
  }

  return (
    <div>
      <Inline
          {...props}
          textInput={
            <TextInput
                onChange={handleInputChange}
                value={formValue}
            />
          }
          textKit={
            <Title
                size={4}
                tag="h4"
                text={formValue}
            />
          }
      />
    </div>
  )
}

export default InlineDefault
