
import React from 'react'
import ProgressPills from '../_progress_pills.jsx'

const ProgressPillsStatus = (props) => {
  return (
    <div>
      <ProgressPills
          active={2}
          steps={3}
          title="Status:"
          value="Orientation"
          {...props}
      />
    </div>
  )
}

export default ProgressPillsStatus
