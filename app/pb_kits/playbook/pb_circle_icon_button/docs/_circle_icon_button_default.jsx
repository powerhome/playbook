import React from "react"
import { CircleIconButton } from "../../"

const CircleIconButtonDefault = () => (
  <div>
    <CircleIconButton
        icon="plus"
        variant="primary"
    />

    <br />

    <CircleIconButton
        icon="pen"
        variant="secondary"
    />

    <br />

    <CircleIconButton
        disabled
        icon="times"
    />

    <br />

    <CircleIconButton
        icon="user"
        variant="link"
    />
  </div>
)

export default CircleIconButtonDefault