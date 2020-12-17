
import React from 'react'
import ProgressPills from '../_progress_pills.jsx'

const ProgressPillsDefault = (props) => {
  return (
    <div>
      <ProgressPills
          active={2}
          steps={3}
          {...props}
      />
    </div>
  )
}

export default ProgressPillsDefault
