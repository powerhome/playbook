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
      <ProgressStepItem status="complete" />
      <ProgressStepItem status="active" />
      <ProgressStepItem status="inactive" />
    </ProgressStep>

    <br />
    <br />

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

export default ProgressStepDefault
