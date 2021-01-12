import React from 'react'
import { FixedConfirmationToast } from '../../'

const FixedConfirmationToastMultiLineDark = (props) => {
  return (
    <div>
      <FixedConfirmationToast
          dark
          status="tip"
          text={'Scan to Assign Selected Items.\n Click here to generate report'}
          {...props}
      />
    </div>
  )
}

export default FixedConfirmationToastMultiLineDark
