import React from "react"
import { FixedConfirmationToast } from "../../"

function FixedConfirmationToastDefault() {
  return (
    <div>
      <div>
        <FixedConfirmationToast
            status="error"
            text="Error Message"
        />
      </div>

      <br/><br/>

      <div>
        <FixedConfirmationToast
            status="success"
            text="Items Successfully Moved"
        />
      </div>

      <br/><br/>

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
