import React, { useState } from 'react'
import { Inline, TextInput, Title } from '../..'

const InlineTitle = (props) => {
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
                size={1}
                tag="h1"
                text={formValue}
            />
          }
      />

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
                size={2}
                tag="h2"
                text={formValue}
            />
          }
      />

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
                size={3}
                tag="h3"
                text={formValue}
            />
          }
      />
    </div>
  )
}

export default InlineTitle
