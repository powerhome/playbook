import React from 'react'
import ProgressStep from '../_progress_step.jsx'
import ProgressStepItem from '../_progress_step_item.jsx'

const ProgressStepDark = () => (
  <div>
    <ProgressStep
        dark
        icon
    >
      <ProgressStepItem status="complete" />
      <ProgressStepItem status="active" />
      <ProgressStepItem status="inactive" />
    </ProgressStep>
  </div>
)

export default ProgressStepDark
