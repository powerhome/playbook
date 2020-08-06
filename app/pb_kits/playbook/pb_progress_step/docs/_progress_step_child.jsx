import React from 'react'
import ProgressStep from '../_progress_step.jsx'
import ProgressStepItem from '../_progress_step_item.jsx'

const ProgressStepChild = () => (
  <div>
    <ProgressStep>
      <ProgressStepItem status="complete">
        {'Child'}
      </ProgressStepItem>
      <ProgressStepItem status="active">
        {'Child'}
      </ProgressStepItem>
      <ProgressStepItem status="inactive">
        {'Child'}
      </ProgressStepItem>
    </ProgressStep>
  </div>
)

export default ProgressStepChild
