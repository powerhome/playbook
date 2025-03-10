import React from 'react'
import ProgressSimple from '../../pb_progress_simple/_progress_simple'

const ProgressSimpleMuted = () => {
  return (
    <div>
      <ProgressSimple
          muted
          percent={68}
      />
    </div>
  )
}

export default ProgressSimpleMuted
