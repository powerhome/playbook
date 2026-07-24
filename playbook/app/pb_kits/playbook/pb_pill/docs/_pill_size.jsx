import React from 'react'
import Pill from '../_pill'

const PillSize = (props) => {
  return (
    <div>
      <Pill
          size="sm"
          text="small"
          {...props}
      />
    </div>
  )
}

export default PillSize
