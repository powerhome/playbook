import React from 'react'
import ProgressStep from '../_progress_step.jsx'
import ProgressStepItem from '../_progress_step_item.jsx'
import { Caption } from '../../'
const ProgressStepTracker = (props) => (
  <div>
    <br />
    <ProgressStep
        icon
        variant="tracker"
        {...props}
    >
      <ProgressStepItem
          icon="exclamation-triangle"
          status="complete"
      >
        <Caption>{'Ordered'}</Caption>
      </ProgressStepItem>
      <ProgressStepItem
          icon="exclamation-triangle"
          status="active"
      >
        <Caption>{'Shipped'}</Caption>
      </ProgressStepItem>
      <ProgressStepItem icon="exclamation-triangle">
        <Caption>{'Delivered'}</Caption>
      </ProgressStepItem>
    </ProgressStep>

    <br />
    <ProgressStep
        icon
        variant="tracker"
        {...props}
    >
      <ProgressStepItem status="complete" />
      <ProgressStepItem status="complete" />
      <ProgressStepItem status="hidden" />
      <ProgressStepItem status="active" />
      <ProgressStepItem status="inactive" />
    </ProgressStep>
  </div>
)

export default ProgressStepTracker
