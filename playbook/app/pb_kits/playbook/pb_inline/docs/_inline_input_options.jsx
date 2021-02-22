import React, { useState } from 'react'
import { Body, Inline, Textarea, TextInput } from '../../'

const InlineInputOptions = (props) => {
  const [formFields, setFormFields] = useState({
    inputOne: 'Input One',
    inputTwo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  })

  const handleChange = ({ target }) => {
    const { name, value } = target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div>
      <Inline
          {...props}
          displayKit={
            <Body
                {...props}
                kitType="Body"
                text={formFields.inputOne}
            />
          }
          formInput={
            <TextInput
                {...props}
                name="inputOne"
                onChange={handleChange}
                value={formFields.inputOne}
            />
          }
      />
      <Inline
          {...props}
          displayKit={
            <Body
                {...props}
                kitType="Body"
                text={formFields.inputTwo}
            />
          }
          formInput={
            <Textarea
                {...props}
                name="inputTwo"
                onChange={handleChange}
                resize="auto"
                value={formFields.inputTwo}
            />
          }
      />
    </div>
  )
}

export default InlineInputOptions
