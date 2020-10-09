import React from 'react'
import { FixedConfirmationToast } from '../../'

const FixedConfirmationToastDefault = () => {
  return (
    <div>
      <div>
        <FixedConfirmationToast
            closeable
            status="error"
            text="Error Message"
        />
      </div>

      <br />

      <div>
        <FixedConfirmationToast
            status="success"
            text="Items Successfully Moved"
        />
      </div>

      <br />

      <div>
        <FixedConfirmationToast
            status="neutral"
            text="Scan to Assign Selected Items"
        />
      </div>
    </div>
  )
}

export default FixedConfirmationToastDefault
