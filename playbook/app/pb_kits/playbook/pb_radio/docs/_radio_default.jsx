import React from 'react'
import { Radio } from '../../'

const RadioDefault = () => {
  return (
    <div>
      <Radio
          defaultChecked
          label="Power"
          name="Group2"
          value="Power"
      />
      <br />
      <Radio
          defaultChecked={false}
          label="Nitro"
          name="Group2"
          value="Nitro"
      />
      <br />
      <Radio
          defaultChecked={false}
          label="Google"
          name="Group2"
          value="Google"
      />
    </div>
  )
}
export default RadioDefault
