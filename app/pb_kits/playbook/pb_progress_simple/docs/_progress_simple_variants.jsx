import React from 'react'
import { ProgressSimple } from '../..'

const ProgressSimpleVariants = () => {
  return (
    <div>
      <ProgressSimple percent={64.5} />

      <br />

      <ProgressSimple
          percent={90}
          variant="positive"
      />

      <br />

      <ProgressSimple
          percent={10}
          variant="negative"
      />
    </div>
  )
}

export default ProgressSimpleVariants
