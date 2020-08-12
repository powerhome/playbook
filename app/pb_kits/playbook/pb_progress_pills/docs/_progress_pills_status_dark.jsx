import React from 'react'
import ProgressPills from '../_progress_pills.jsx'

const ProgressPillsStatusDark = () => {
  return (
    <div>
      <ProgressPills
          active={2}
          dark
          steps={3}
          title="Status:"
          value="Orientation"
      />

    </div>
  )
}

export default ProgressPillsStatusDark
