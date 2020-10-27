import React from 'react'
import { Radio } from '../..'

const RadioError = () => {
  return (
    <div>
      <Radio
          error
          errorMessage="Please make a selection"
          label="Power"
          name="Group2"
          value="Power"
      />
    </div>
  )
}
export default RadioError
