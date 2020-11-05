import React from 'react'
import { FixedConfirmationToast } from '../../'

const FixedConfirmationToastMultiLine = () => {
  return (
    <div>
      <FixedConfirmationToast
          status="tip"
          text={'Scan to Assign Selected Items.\n Click here to generate report'}
      />
    </div>
  )
}

export default FixedConfirmationToastMultiLine
