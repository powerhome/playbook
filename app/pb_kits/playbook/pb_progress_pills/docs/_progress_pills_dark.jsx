
import React from "react"
import ProgressPills from "../_progress_pills.jsx"


function ProgressPillsDark() {
return (
  <div>
    <ProgressPills
        active={2}
        dark
        title="Status:"
        steps={3}
        value="Orientation"
    />

  </div>
)
}

export default ProgressPillsDark;
