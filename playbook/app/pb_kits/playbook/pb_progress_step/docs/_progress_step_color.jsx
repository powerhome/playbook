import React from 'react'

import ProgressStep from '../_progress_step.tsx'
import ProgressStepItem from '../_progress_step_item.tsx'

const ProgressStepColor = (props) => (
  <div>
    <ProgressStep 
        color="info"
        icon 
        variant="tracker" 
        {...props}
    >
      <ProgressStepItem status="complete" />
      <ProgressStepItem status="active" />
      <ProgressStepItem status="inactive" />
    </ProgressStep>
  </div>
)

export default ProgressStepColor
