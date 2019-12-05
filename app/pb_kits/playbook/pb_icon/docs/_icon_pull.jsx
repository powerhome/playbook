import React from "react"
import { Icon } from "../../"

function IconPull() {
  return (
    <div>
      <Icon
          fixedWidth
          icon="arrow-left"
          pull="left"
          size="2x"
      />
      <Icon
          fixedWidth
          icon="arrow-right"
          pull="right"
          size="2x"
      />
    </div>
  )
}

export default IconPull
