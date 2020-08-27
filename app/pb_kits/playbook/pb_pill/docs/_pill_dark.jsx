import React from 'react'
import Pill from '../_pill.jsx'

const PillDark = () => {
  return (
    <div>
      <Pill
          dark
          text="default"
      />

      <br />
      <br />

      <Pill
          dark
          text="success"
          variant="success"
      />

      <br />
      <br />

      <Pill
          dark
          text="error"
          variant="error"
      />

      <br />
      <br />

      <Pill
          dark
          text="warning"
          variant="warning"
      />

      <br />
      <br />

      <Pill
          dark
          text="info"
          variant="info"
      />

      <br />
      <br />

      <Pill
          dark
          text="neutral"
          variant="neutral"
      />

      <br />
      <br />

      <Pill
          dark
          text="primary"
          variant="primary"
      />
    </div>
  )
}

export default PillDark
