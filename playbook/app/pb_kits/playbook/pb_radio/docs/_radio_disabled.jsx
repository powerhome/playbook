import React from 'react'

import Radio from '../_radio'

const RadioDisabled = (props) => {
  const ref = React.createRef()

  return (
    <div>
      <Radio
          disabled
          label="Disabled unselected no checked info"
          name="DisabledGroup"
          ref={ref}
          tabIndex={0}
          value="Disabled unselected no checked info"
          {...props}
      />
      <br />
      <Radio
          checked 
          disabled
          label="TBDisabled selected with default checked true"
          name="DisabledGroup"
          value="TBDisabled selected with default checked true"
          {...props}
      />
    </div>
  )
}
export default RadioDisabled
