import React from 'react'

import ProgressStep from '../_progress_step.jsx'
import ProgressStepItem from '../_progress_step_item'

import Caption from '../../pb_caption/_caption'

const ProgressStepTracker = (props) => (
  <div>
    <br />
    <ProgressStep
        icon
        variant="tracker"
        {...props}
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
