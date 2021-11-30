import React from 'react'
import Pill from '../_pill'

const PillExample = (props) => {
  return (
    <div>
      <Pill
          text="Success"
          textTransform="none"
          variant="success"
          {...props}
      />
    </div>
  )
}

export default PillExample
