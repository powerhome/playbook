
import React from 'react'
import ProgressPills from '../_progress_pills.jsx'

const ProgressPillsDefault = (props) => {
  return (
    <div>
      <ProgressPills
          active={2}
          aria={{ label: '2 out of 3 steps complete' }}
          steps={3}
          {...props}
      />
    </div>
  )
}

export default ProgressPillsDefault
