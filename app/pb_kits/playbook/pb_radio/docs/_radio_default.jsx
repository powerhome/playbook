import React from "react"
import {Radio} from "../_radio.jsx"

function RadioDefault() {
  return (
    <>
      <Radio label="Nitro"
          name="Group1"
          value="nitro"
      />
      <br/>
      <Radio label="Power"
          name="Group1"
          value="power"
      />
      <br/>
      <Radio label="Google"
          name="Group1"
          value="google"
      />
    </>
  )
}

export default RadioDefault
