import React from 'react'
import { ProgressSimple } from 'playbook-ui'

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
