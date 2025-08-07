import React from 'react'

import FixedConfirmationToast from '../_fixed_confirmation_toast'

const FixedConfirmationToastNoIcon = (props) => {
  return (
    <div>
      <div>
        <FixedConfirmationToast
            closeable
            icon="none"
            status="error"
            text="Error Message"
            {...props}
        />
      </div>

      <br />

      <div>
        <FixedConfirmationToast
            icon="none"
            status="success"
            text="Items Successfully Moved"
            {...props}
        />
      </div>

      <br />

      <div>
        <FixedConfirmationToast
            icon="none"
            status="neutral"
            text="Scan to Assign Selected Items"
            {...props}
        />
      </div>
    </div>
  )
}

export default FixedConfirmationToastNoIcon
