import React, { useState } from 'react'
import { Body, Inline, Textarea, TextInput } from '../../'

const InlineBody = (props) => {
  const [formValueTwo, setFormValueTwo] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')

  const handleAreaChange = (event) => {
    setFormValueTwo(event.target.value)
  }

  return (
    <div>
      <Inline
          {...props}
          displayKit={
            <Body
                kitName="Body"
                text={formValueTwo}
            />
          }
          formInput={
            <TextInput
                onChange={handleAreaChange}
                value={formValueTwo}
            />
          }
      />
      <Inline
          {...props}
          displayKit={
            <Body
                kitName="Body"
                text={formValueTwo}
            />
          }
          formInput={
            <Textarea
                onChange={handleAreaChange}
                resize="auto"
                value={formValueTwo}
            />
          }
      />
    </div>
  )
}

export default InlineBody
