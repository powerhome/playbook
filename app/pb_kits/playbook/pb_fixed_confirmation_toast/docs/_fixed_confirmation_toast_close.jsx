import React from 'react'
import { FixedConfirmationToast } from '../../'

const FixedConfirmationToastClose = () => {
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
      <br />

      <div>
        <FixedConfirmationToast
            closeable
            status="success"
            text="Items Successfully Moved"
        />
      </div>

      <br />
      <br />

      <div>
        <FixedConfirmationToast
            closeable
            status="neutral"
            text="Scan to Assign Selected Items"
        />
      </div>
    </div>
  )
}

export default FixedConfirmationToastClose
