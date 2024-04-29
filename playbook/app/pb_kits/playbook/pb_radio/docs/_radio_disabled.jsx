import React from 'react'

import Radio from '../_radio'

const RadioDisabled = (props) => {
  const ref = React.createRef()

  return (
    <div>
      <Radio
          disabled
          label="Disabled unselected"
          name="DisabledGroup"
          ref={ref}
          tabIndex={0}
          value="Disabled unselected"
          {...props}
      />
      <br />
      <Radio
          checked 
          disabled
          label="Disabled selected"
          name="DisabledGroup"
          value="Disabled selected"
          {...props}
      />
    </div>
  )
}
export default RadioDisabled
