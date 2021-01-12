import React, { useState } from 'react'
import { Radio } from '../../'

const RadioCustom = (props) => {
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
          {...props}
      >
        <input
            checked={choice === 'power'}
            name="custom"
            onChange={handleOnChange}
            type="radio"
            value="power"
            {...props}
        />
      </Radio>
      <br />
      <Radio
          className="my_custom_class"
          label="Custom Nitro"
          {...props}
      >
        <input
            checked={choice === 'nitro'}
            name="custom"
            onChange={handleOnChange}
            type="radio"
            value="nitro"
            {...props}
        />
      </Radio>
      <br />
      <Radio
          className="my_custom_class"
          label="Custom Google"
          {...props}
      >
        <input
            checked={choice === 'google'}
            name="custom"
            onChange={handleOnChange}
            type="radio"
            value="google"
            {...props}
        />
      </Radio>
    </div>
  )
}
export default RadioCustom
