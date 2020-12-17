import React, { useState } from 'react'
import { Radio } from '../../'

const RadioCustom = () => {
  const [choice, setChoice] = useState('power')

  const handleOnChange = ({ target }) => {
    setChoice(target.value)
  }

  return (
    <div>
      <p>
        {'Your choice is: '}
        <code>{choice}</code>
      </p>
      <br />
      <Radio
          className="my_custom_class"
          label="Custom Power"
      >
        <input
            checked={choice === 'power'}
            name="custom"
            onChange={handleOnChange}
            type="radio"
            value="power"
        />
      </Radio>
      <br />
      <Radio
          className="my_custom_class"
          label="Custom Nitro"
      >
        <input
            checked={choice === 'nitro'}
            name="custom"
            onChange={handleOnChange}
            type="radio"
            value="nitro"
        />
      </Radio>
      <br />
      <Radio
          className="my_custom_class"
          label="Custom Google"
      >
        <input
            checked={choice === 'google'}
            name="custom"
            onChange={handleOnChange}
            type="radio"
            value="google"
        />
      </Radio>
    </div>
  )
}
export default RadioCustom
