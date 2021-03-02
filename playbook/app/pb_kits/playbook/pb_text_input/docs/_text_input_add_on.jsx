import React from 'react'
import { TextInput } from '../../'

const TextInputAddOn = (props) => {
  return (
    <>
      <div>
        <TextInput
            addOn={{ icon: 'user', alignment: 'right', border: true }}
            label="Right-Aligned Add On With Border"
            {...props}
        />
      </div>
      <div>
        <TextInput
            addOn={{ icon: 'percent', alignment: 'left', border: false }}
            label="Left-Aligned Add On With No Border"
            {...props}
        />
      </div>
    </>
  )
}

export default TextInputAddOn
