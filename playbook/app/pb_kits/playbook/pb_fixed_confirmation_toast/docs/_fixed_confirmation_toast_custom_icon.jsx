import React from 'react'

import FixedConfirmationToast from '../_fixed_confirmation_toast'

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
      <div>
        <FixedConfirmationToast
            status="success"
            text="Items Successfully Moved"
            {...props}
        />
      </div>
      <div>
        <FixedConfirmationToast
            status="neutral"
            text="Scan to Assign Selected Items"
            {...props}
        />
      </div>
      <div>
        <FixedConfirmationToast
            status="tip"
            text="Primary Blue example"
            {...props}
        />
      </div>
    </div>
  )
}

export default FixedConfirmationToastDefault
