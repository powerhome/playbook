
import React from "react"
import ProgressPills from "../_progress_pills.jsx"


function ProgressPillsStatus() {
return (
  <div>
    <ProgressPills
        active={2}
        title="Status:"
        steps={3}
        value="Orientation"
    />

  </div>
)
}

export default ProgressPillsStatus;
