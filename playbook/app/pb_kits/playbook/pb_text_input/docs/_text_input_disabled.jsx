import React from 'react'
import { TextInput } from '../../'

class TextInputDisabled extends React.Component {
  render(props) {
    return (
      <div>
        <TextInput
            disabled
            label="Last Name"
            placeholder="Enter last name"
            {...props}
        />
      </div>
    )
  }
}

export default TextInputDisabled
