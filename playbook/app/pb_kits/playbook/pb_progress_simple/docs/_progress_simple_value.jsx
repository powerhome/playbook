import React from 'react'
import ProgressSimple from '../../pb_progress_simple/_progress_simple'

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
