import React from 'react'
import { Radio } from '../../'

const RadioDark = () => {
  return (
    <>
      <Radio
          dark="true"
          label="Power"
          name="Group1"
          value="Power"
      />
      <br />
      <Radio
          checked
          dark="true"
          label="Nitro"
          name="Group1"
          value="Nitro"
      />
      <br />
      <Radio
          dark="true"
          label="Google"
          name="Group1"
          value="Google"
      />
    </>
  )
}
export default RadioDark
