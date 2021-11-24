import React from 'react'
import Pill from '../_pill.jsx'

const PillVariants = () => {
  return (
    <div>
      <Pill
          text="success"
          variant="success"
      />

      <Pill
          text="error"
          variant="error"
      />

      <Pill
          text="warning"
          variant="warning"
      />

      <Pill
          text="info"
          variant="info"
      />

      <Pill
          text="neutral"
          variant="neutral"
      />

      <Pill
          text="primary"
          variant="primary"
      />
    </div>
  )
}

export default PillVariants
