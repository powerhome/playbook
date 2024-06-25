import React from 'react'

import FixedConfirmationToast from '../_fixed_confirmation_toast'

const FixedConfirmationToastCustomIcon = (props) => {
  return (
    <div>
      <div>
        <FixedConfirmationToast
            closeable
            icon="wrench"
            marginBottom="md"
            status="error"
            text="Fix before proceeding"
            {...props}
        />
      </div>
      <div>
        <FixedConfirmationToast
            icon="star"
            marginBottom="md"
            status="success"
            text="Thank you for completing the form!"
            {...props}
        />
      </div>
      <div>
        <FixedConfirmationToast
            icon="file-pdf"
            marginBottom="md"
            status="neutral"
            text="Saved as PDF"
            {...props}
        />
      </div>
      <div>
        <FixedConfirmationToast
            icon="arrow-down"
            status="tip"
            text="New Messages"
            {...props}
        />
      </div>
    </div>
  )
}

export default FixedConfirmationToastCustomIcon
