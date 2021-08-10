import React, { useState } from 'react'

import ProgressStep from '../_progress_step.jsx'
import ProgressStepItem from '../_progress_step_item'

import Caption from '../../pb_caption/_caption'
import Button from '../../pb_button/_button'

const ProgressStepTrackerClickEvents = (props) => {
  const [warning, setWarning] = useState(false)
  const showWarning = warning == true
  const WarningIcon = (
    <ProgressStepItem
        icon="exclamation-triangle"
        key={Math.random()}
        status="active"
    >
      <Caption>{'Shipped'}</Caption>
    </ProgressStepItem>
  )
  const CheckedIcon = (
    <ProgressStepItem
        key={Math.random()}
        status="active"
    >
      <Caption>{'Shipped'}</Caption>
    </ProgressStepItem>
  )
  return (
    <div>
      <Button onClick={() => setWarning(!warning)}>{'Toggle State'}</Button>
      <br />
      <br />
      <br />
      <ProgressStep
          icon
          variant="tracker"
          {...props}
      >
        <ProgressStepItem status="complete">
          <Caption>{'Ordered'}</Caption>
        </ProgressStepItem>
        {showWarning ? WarningIcon : CheckedIcon}
        <ProgressStepItem status="inactive">
          <Caption>{'Delivered'}</Caption>
        </ProgressStepItem>
      </ProgressStep>
    </div>
  )
}

export default ProgressStepTrackerClickEvents
