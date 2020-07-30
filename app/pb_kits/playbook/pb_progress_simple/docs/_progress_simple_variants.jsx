import React from 'react'
import { ProgressSimple } from '../..'

const ProgressSimpleVariants = () => {
  return (
    <div>
      <ProgressSimple percent={64.5} />

      <br />

      <ProgressSimple
          percent={64.5}
          variant="positive"
      />

      <br />

      <ProgressSimple
          percent={64.5}
          variant="negative"
      />
    </div>
  )
}

export default ProgressSimpleVariants
