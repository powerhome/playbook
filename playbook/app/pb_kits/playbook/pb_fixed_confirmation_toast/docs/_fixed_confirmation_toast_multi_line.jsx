import React from 'react'
import { FixedConfirmationToast } from '../../'

const FixedConfirmationToastMultiLine = (props) => {
  return (
    <div>
      <FixedConfirmationToast
          status="tip"
          text={'Scan to Assign Selected Items.\n Click here to generate report'}
          {...props}
      />
    </div>
  )
}

export default FixedConfirmationToastMultiLine
