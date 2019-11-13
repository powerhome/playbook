
import React from "react"
import ProgressPills from "../_progress_pills.jsx"


function ProgressPillsStatus() {
return (
  <div>
    <ProgressPills
        active={2}
        status="Status:"
        steps={3}
        text="Orientation"
    />

  </div>
)
}

export default ProgressPillsStatus;
