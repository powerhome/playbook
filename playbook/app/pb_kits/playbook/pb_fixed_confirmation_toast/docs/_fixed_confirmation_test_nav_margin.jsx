import React from 'react'

import FixedConfirmationToast from '../_fixed_confirmation_toast'

const FixedConfirmationToastNavMargin = (props) => {
  return (
    <div>
        <FixedConfirmationToast
            closeable
            navMarginTop
            status="error"
            text="Error Message"
            {...props}
        />
    </div>
  )
}

export default FixedConfirmationToastNavMargin
