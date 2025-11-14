import React from 'react'

import ProgressStep from '../_progress_step.tsx'
import ProgressStepItem from '../_progress_step_item.tsx'
import Caption from '../../pb_caption/_caption'

const ProgressStepCustomIcon = (props) => (
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
      <ProgressStepItem 
          icon="exclamation-triangle"
          status="active" 
      >
        <Caption>{'Shipped'}</Caption>
      </ProgressStepItem>
      <ProgressStepItem status="inactive">
        <Caption>{'Delivered'}</Caption>
      </ProgressStepItem>
    </ProgressStep>
  </div>
)

export default ProgressStepCustomIcon
