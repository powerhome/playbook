
import React from 'react'
import ProgressPills from '../_progress_pills.jsx'

function ProgressPillsStatus() {
return (
  <div>
    <ProgressPills
        active={2}
        steps={3}
        title="Status:"
        value="Orientation"
    />

  </div>
)
}

export default ProgressPillsStatus
