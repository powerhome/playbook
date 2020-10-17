import React from 'react'
import { FixedConfirmationToast } from '../..'

const FixedConfirmationToastDark = () => {
  return (
    <div>
      <div>
        <FixedConfirmationToast
            dark
            status="error"
            text="Error Message"
        />
      </div>

      <br />
      <br />

      <div>
        <FixedConfirmationToast
            dark
            status="success"
            text="Items Successfully Moved"
        />
      </div>

      <br />
      <br />

      <div>
        <FixedConfirmationToast
            dark
            status="neutral"
            text="Scan to Assign Selected Items"
        />
      </div>
    </div>
  )
}

export default FixedConfirmationToastDark
