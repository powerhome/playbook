import React from 'react'
import { TextInput } from '../../'

class TextInputDisabled extends React.Component {
  render() {
    return (
      <div>
        <TextInput
            disabled
            label="Last Name"
            placeholder="Enter last name"
        />
      </div>
    )
  }
}

export default TextInputDisabled
