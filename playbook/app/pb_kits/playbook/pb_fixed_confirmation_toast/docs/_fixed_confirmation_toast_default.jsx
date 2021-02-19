import React from 'react'
import { FixedConfirmationToast } from '../../'

const FixedConfirmationToastDefault = (props) => {
  return (
    <div>
      <div>
        <FixedConfirmationToast
            closeable
            status="error"
            text="Error Message"
            {...props}
        />
      </div>

      <br />

      <div>
        <FixedConfirmationToast
            status="success"
            text="Items Successfully Moved"
            {...props}
        />
      </div>

      <br />

      <div>
        <FixedConfirmationToast
            status="neutral"
            text="Scan to Assign Selected Items"
            {...props}
        />
      </div>
    </div>
  )
}

export default FixedConfirmationToastDefault
