import React from 'react'
import ProgressStep from '../_progress_step.jsx'
import ProgressStepItem from '../_progress_step_item.jsx'
import { Caption } from '../../'
const ProgressStepTracker = () => (
  <div>
    <ProgressStep
        variant="tracker"
    >
      <ProgressStepItem status="complete">
        <Caption>{'Ordered'}</Caption>
      </ProgressStepItem>
      <ProgressStepItem status="active">
        <Caption>{'Shipped'}</Caption>
      </ProgressStepItem>
      <ProgressStepItem status="inactive">
        <Caption>{'Delivered'}</Caption>
      </ProgressStepItem>
    </ProgressStep>
  </div>
)

export default ProgressStepTracker
