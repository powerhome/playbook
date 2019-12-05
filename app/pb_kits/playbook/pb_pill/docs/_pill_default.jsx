import React from "react"
import Pill from "../_pill.jsx"

function PillDefault() {
  return (
    <div>
      <Pill text="default" />

      <br />
      <br />

      <Pill
          text="success"
          variant="success"
      />

      <br />
      <br />

      <Pill
          text="error"
          variant="error"
      />

      <br />
      <br />

      <Pill
          text="warning"
          variant="warning"
      />

      <br />
      <br />

      <Pill
          text="info"
          variant="info"
      />

      <br />
      <br />

      <Pill
          text="neutral"
          variant="neutral"
      />

      <br />
      <br />

      <Pill
          text="primary"
          variant="primary"
      />
    </div>
  )
}

export default PillDefault
