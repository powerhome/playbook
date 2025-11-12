import React from 'react'

import ProgressStep from '../_progress_step.tsx'
import ProgressStepItem from '../_progress_step_item.tsx'

const ProgressStepDefault = (props) => (
  <div>
    <ProgressStep
        icon
        {...props}
    >
      <ProgressStepItem status="complete" />
      <ProgressStepItem status="complete" />
      <ProgressStepItem status="active" />
      <ProgressStepItem status="inactive" />
    </ProgressStep>

    <br />
    <br />

    <ProgressStep {...props}>
      <ProgressStepItem status="complete">{'Step 1'}</ProgressStepItem>
      <ProgressStepItem status="active">{'Step 2'}</ProgressStepItem>
      <ProgressStepItem status="inactive">{'Step 3'}</ProgressStepItem>
    </ProgressStep>

    <br />
    <br />
  </div>
)

export default ProgressStepDefault
