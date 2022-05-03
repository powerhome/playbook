import React from 'react'
import Pill from '../_pill'

const PillVariants = (props) => {
  return (
    <div>
      <Pill
          text="success"
          variant="success"
          {...props}
      />

      <Pill
          text="error"
          variant="error"
          {...props}
      />

      <Pill
          text="warning"
          variant="warning"
          {...props}
      />

      <Pill
          text="info"
          variant="info"
          {...props}
      />

      <Pill
          text="neutral"
          variant="neutral"
      />

      <Pill
          text="primary"
          variant="primary"
          {...props}
      />
    </div>
  )
}

export default PillVariants
