import React from 'react'
import {FixedConfirmationToast} from '../../'

function FixedConfirmationToastMultiLine() {
  return (
    <div>
        <FixedConfirmationToast text={`Scan to Assign Selected Items.\n Click X to close at any time`} status='tip' />
    </div>
  )
}

export default FixedConfirmationToastMultiLine;
