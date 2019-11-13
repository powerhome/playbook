
import React from "react"
import ProgressPills from "../_progress_pills.jsx"


function ProgressPillsDark() {
return (
  <div>
    <ProgressPills
        active={2}
        dark
        status="Status:"
        steps={3}
        text="Orientation"
    />

  </div>
)
}

export default ProgressPillsDark;
