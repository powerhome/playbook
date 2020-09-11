import React from 'react'
import { Radio } from '../../'

const RadioDark = () => {
  return (
    <>
      <Radio
          dark
          defaultChecked
          label="Power"
          name="Group1"
          value="Power"
      />
      <br />
      <Radio
          dark
          defaultChecked={false}
          label="Nitro"
          name="Group1"
          value="Nitro"
      />
      <br />
      <Radio
          dark
          defaultChecked={false}
          label="Google"
          name="Group1"
          value="Google"
      />
    </>
  )
}
export default RadioDark
