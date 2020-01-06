import React from 'react'
import { Radio } from '../../'

const RadioCustom = () => {
  return (
    <div>
      <Radio
          className="my_custom_class"
          label="Custom Power"
      >
        <input
            name="custom"
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
            defaultChecked
            name="custom"
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
            name="custom"
            type="radio"
            value="google"
        />
      </Radio>
    </div>
  )
}
export default RadioCustom
