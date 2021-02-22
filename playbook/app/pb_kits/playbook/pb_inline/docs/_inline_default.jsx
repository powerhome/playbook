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
          displayKit={
            <Title
                kitType="Title"
                size={4}
                tag="h4"
                text={formValue}
            />
          }
          formInput={
            <TextInput
                onChange={handleInputChange}
                value={formValue}
            />
          }
      />
    </div>
  )
}

export default InlineDefault
