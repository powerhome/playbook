import React from 'react'
import { ProgressSimple } from '../..'

const ProgressSimpleAlign = () => {
  return (
    <div>
      <ProgressSimple
          align="left"
          percent={45}
          width="100px"
      />
      <br />
      <ProgressSimple
          align="center"
          percent={45}
          width="100px"
      />
      <br />
      <ProgressSimple
          align="right"
          percent={45}
          width="100px"
      />
    </div>
  )
}

export default ProgressSimpleAlign
