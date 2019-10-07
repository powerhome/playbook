import React from "react"
import {Radio} from "../_radio.jsx"

function RadioDark() {
  return (
    <>
      <Radio
        dark
          label="Nitro"
          name="Group1"
          value="nitro"
      />
    <br/>
      <Radio
        dark
          label="Power"
          name="Group1"
          value="power"
      />
    <br/>
      <Radio
        dark
          label="Google"
          name="Group1"
          value="google"
      />
    </>
  )
}

export default RadioDark
