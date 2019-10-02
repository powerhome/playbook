import React from "react"
import {FixedConfirmationToast} from "../../"

function FixedConfirmationToastDefault() {
  return (
    <div>
      <div>
        <FixedConfirmationToast text="Error Message" status="error" />
      </div>

      <br/><br/>

      <div>
        <FixedConfirmationToast text="Items Successfully Moved" status="success" />
      </div>

      <br/><br/>

      <div>
        <FixedConfirmationToast text="Scan to Assign Selected Items" status="neutral" />
      </div>
    </div>
  )
}

export default FixedConfirmationToastDefault;
