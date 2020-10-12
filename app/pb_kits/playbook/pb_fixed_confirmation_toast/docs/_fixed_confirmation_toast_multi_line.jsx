import React from 'react'
import { FixedConfirmationToast } from '../../'

const FixedConfirmationToastMultiLine = () => {
  return (
    <div>
      <FixedConfirmationToast
          status="tip"
          text={'Scan to Assign Selected Items.\n Click X to close at any time'}
      />
    </div>
  )
}

export default FixedConfirmationToastMultiLine
