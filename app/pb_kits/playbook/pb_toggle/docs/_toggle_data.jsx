// @flow

import React from "react"
import { Toggle } from "../.."

const Example = () => {
  return (
    <Toggle
        checked
        data={{ id: "the-toggle", expanded: true }}
    />
  )
}

export default Example
