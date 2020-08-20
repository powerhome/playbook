import React from 'react'
import ProgressStep from '../_progress_step.jsx'
import ProgressStepItem from '../_progress_step_item.jsx'

const ProgressStepDefault = () => (
  <div>
    <ProgressStep icon>
      <ProgressStepItem status="complete" />
      <ProgressStepItem status="active" />
      <ProgressStepItem status="inactive" />
    </ProgressStep>

    <br />
    <br />

    <ProgressStep>
      <ProgressStepItem status="complete">{'Step 1'}</ProgressStepItem>
      <ProgressStepItem status="active">{'Step 2'}</ProgressStepItem>
      <ProgressStepItem status="inactive">{'Step 3'}</ProgressStepItem>
    </ProgressStep>

    <br />
    <br />
  </div>
)

export default ProgressStepDefault
