import React from 'react'
import ProgressStep from '../_progress_step.jsx'
import ProgressStepItem from '../_progress_step_item.jsx'

const ProgressStepVertical = () => (
  <div>
    <ProgressStep
        icon
        orientation="vertical"
    >
      <ProgressStepItem status="complete" />
      <ProgressStepItem status="active" />
      <ProgressStepItem status="inactive" />
    </ProgressStep>

    <br />

    <ProgressStep orientation="vertical">
      <ProgressStepItem status="complete" />
      <ProgressStepItem status="active" />
      <ProgressStepItem status="inactive" />
    </ProgressStep>

    <br />

    <ProgressStep orientation="vertical">
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

export default ProgressStepVertical
