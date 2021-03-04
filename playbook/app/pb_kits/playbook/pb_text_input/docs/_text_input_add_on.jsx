import React, { useState } from 'react'
import { TextInput } from '../../'

const TextInputAddOn = (props) => {
  const [firstInput, setFirstInput] = useState('')
  const [secondInput, setSecondInput] = useState('')
  const [thirdInput, setThirdInput] = useState('')
  const [fourthInput, setFourthInput] = useState('')

  const handleUpdateFirstInput = ({ target }) => {
    setFirstInput(target.value)
  }

  const handleUpdateSecondInput = ({ target }) => {
    setSecondInput(target.value)
  }

  const handleUpdateThirdInput = ({ target }) => {
    setThirdInput(target.value)
  }

  const handleUpdateFourthInput = ({ target }) => {
    setFourthInput(target.value)
  }

  return (
    <>
      <div>
        <TextInput
            addOn={{ icon: 'user', alignment: 'right', border: true }}
            label="Right-Aligned Add On With Border"
            onChange={handleUpdateFirstInput}
            value={firstInput}
            {...props}
        />
      </div>
      <div>
        <TextInput
            addOn={{ icon: 'percent', alignment: 'left', border: false }}
            label="Left-Aligned Add On With No Border"
            onChange={handleUpdateSecondInput}
            value={secondInput}
            {...props}
        />
      </div>
      <div>
        <TextInput
            addOn={{ icon: 'percent', alignment: 'right', border: false }}
            label="Right-Aligned Add On With No Border"
            onChange={handleUpdateThirdInput}
            value={thirdInput}
            {...props}
        />
      </div>
      <div>
        <TextInput
            addOn={{ icon: 'percent', alignment: 'left', border: true }}
            label="Left-Aligned Add On With Border"
            onChange={handleUpdateFourthInput}
            value={fourthInput}
            {...props}
        />
      </div>
    </>
  )
}

export default TextInputAddOn
