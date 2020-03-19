import React from 'react'
import { ProgressSimple } from '../..'

const ProgressSimpleValue = () => {
  return (
    <div>
      <ProgressSimple
          align="left"
          percent={68}
      />
      <br />
      <ProgressSimple
          max="10"
          value="2"
      />
    </div>
  )
}

export default ProgressSimpleValue
