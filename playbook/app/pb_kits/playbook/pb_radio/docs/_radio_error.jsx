import React from 'react'
import { Radio } from '../..'

const RadioError = (props) => {
  return (
    <div>
      <Radio
          error
          label="Power"
          name="Group2"
          value="Power"
          {...props}
      />
    </div>
  )
}
export default RadioError
