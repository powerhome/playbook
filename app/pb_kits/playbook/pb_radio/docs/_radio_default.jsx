import React from 'react'
import { Radio } from '../../'

const RadioDefault = () => {
  return (
    <div>
      <Radio
          label="Power"
          name="Group2"
          value="Power"
      />
      <br />
      <Radio
          defaultChecked
          label="Nitro"
          name="Group2"
          value="Nitro"
      />
      <br />
      <Radio
          label="Google"
          name="Group2"
          value="Google"
      />
    </div>
  )
}
export default RadioDefault
