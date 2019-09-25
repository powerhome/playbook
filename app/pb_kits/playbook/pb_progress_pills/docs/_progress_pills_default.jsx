import React from "react"
import ProgressPills from "../_progress_pills.jsx"

function ProgressPillsDefault() {
  return (
    <div>
      <ProgressPills steps={3} />

      <br />
      <br />

      <ProgressPills
          active={2}
          steps={3}
      />
    </div>
  )
}

export default ProgressPillsDefault;
