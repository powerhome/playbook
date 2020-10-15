import React from 'react'
import { FixedConfirmationToast } from '../../'

const FixedConfirmationToastMultiLineDark = () => {
  return (
    <div>
      <FixedConfirmationToast
          dark
          status="tip"
          text={'Scan to Assign Selected Items.\n Click here to generate report'}
      />
    </div>
  )
}

export default FixedConfirmationToastMultiLineDark
