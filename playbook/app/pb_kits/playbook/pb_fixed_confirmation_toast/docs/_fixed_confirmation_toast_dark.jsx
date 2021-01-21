import React from 'react'
import { FixedConfirmationToast } from '../..'

const FixedConfirmationToastDark = (props) => {
  return (
    <div>
      <div>
        <FixedConfirmationToast
            dark
            status="error"
            text="Error Message"
            {...props}
        />
      </div>

      <br />
      <br />

      <div>
        <FixedConfirmationToast
            dark
            status="success"
            text="Items Successfully Moved"
            {...props}
        />
      </div>

      <br />
      <br />

      <div>
        <FixedConfirmationToast
            dark
            status="neutral"
            text="Scan to Assign Selected Items"
            {...props}
        />
      </div>
    </div>
  )
}

export default FixedConfirmationToastDark
