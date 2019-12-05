import React from "react"
import { CircleIconButton } from "../../"

const CircleIconButtonDark = () => (
  <div>
    <CircleIconButton
        dark
        icon="plus"
        variant="primary"
    />

    <br/>

    <CircleIconButton
        dark
        icon="pen"
        variant="secondary"
    />

    <br/>

    <CircleIconButton
        dark
        disabled
        icon="times"
    />

    <br/>

    <CircleIconButton
        dark
        icon="user"
        variant="link"
    />
  </div>
)

export default CircleIconButtonDark