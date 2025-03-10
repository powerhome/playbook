import React from 'react'
import ProgressSimple from '../../pb_progress_simple/_progress_simple'

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
