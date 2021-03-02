import React from 'react'
import { TextInput } from '../../'

const TextInputAddOn = (props) => {
  return (
    <>
      <div>
        <TextInput
            addOn={{ icon: 'user', alignment: 'right', border: true }}
            label="Add On Label"
            {...props}
        />
      </div>
      <div>
        <TextInput
            addOn={{ icon: 'percent', alignment: 'left', border: false }}
            label="Add On Label"
            {...props}
        />
      </div>
    </>
  )
}

export default TextInputAddOn
