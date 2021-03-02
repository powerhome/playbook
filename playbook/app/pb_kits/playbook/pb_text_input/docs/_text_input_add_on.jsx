import React, { useState } from 'react'
import { TextInput } from '../../'

const TextInputAddOn = (props) => {
  const [name, setName] = useState('')
  const handleUpdateName = ({ target }) => {
    setName(target.value)
  }
  return (
    <>
      <div>
        <TextInput
            addOn={{ icon: 'user', alignment: 'right' }}
            label="Add On Label"
            {...props}
        />
      </div>
      <div>
        <TextInput
            addOn={{ icon: 'percent', alignment: 'left' }}
            label="Add On Label"
            {...props}
        />
      </div>
    </>
  );
}

export default TextInputAddOn
