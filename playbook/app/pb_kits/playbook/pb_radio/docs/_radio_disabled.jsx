import React from 'react'

import Radio from '../_radio'

const RadioDisabled = () => {
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
      />
      <br />
      <Radio
          defaultChecked={false}
          disabled
          label="Disabled unselected with default checked false"
          name="DisabledGroup"
          value="Disabled unselected with default checked false"
      />
      <br />
      {/* <Radio
          defaultChecked={choice === 'TBDisabled selected with default checked true'}
          disabled
          label="TBDisabled selected with default checked true"
          name="DisabledGroup"
          value="TBDisabled selected with default checked true"
      /> */}
    </div>
  )
}
export default RadioDisabled
