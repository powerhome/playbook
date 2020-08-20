import React from 'react'
import { FixedConfirmationToast } from '../../'

const FixedConfirmationToastMultiLineDark = () => {
  return (
    <div>
      <FixedConfirmationToast
          dark
          status="tip"
          text={'Scan to Assign Selected Items.\n Click X to close at any time'}
      />
    </div>
  )
}

export default FixedConfirmationToastMultiLineDark
