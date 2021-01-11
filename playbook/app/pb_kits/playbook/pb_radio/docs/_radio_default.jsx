import React from 'react'
import { Radio } from '../../'

const RadioDefault = () => {
  const ref = React.createRef()

  return (
    <div>
      <Radio
          defaultChecked
          label="Power"
          name="Group2"
          ref={ref}
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
