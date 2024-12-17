import React from 'react'

import Radio from '../_radio'

const RadioDefault = (props) => {
  const ref = React.createRef()

  return (
    <div>
      <Radio
          label="Power"
          name="Group2"
          ref={ref}
          tabIndex={0}
          value="Power"
          {...props}
      />
      <br />
      <Radio
          defaultChecked={false}
          label="Nitro"
          name="Group2"
          value="Nitro"
          {...props}
      />
      <br />
      <Radio
          defaultChecked={false}
          label="Google"
          name="Group2"
          value="Google"
          {...props}
      />
    </div>
  )
}
export default RadioDefault
